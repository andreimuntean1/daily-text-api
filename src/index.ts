import express, { Express, Request, Response } from "express";
import { load } from "cheerio";
import moment from "moment";
import axios from "axios";

const app: Express = express();

async function getLanguage(lang: string = "en") {
  const url = `https://wol.jw.org/${lang}/wol/li/r34/lp-m`;
  const data = await axios(url).then((res) => res.data);

  const $ = load(data);
  const language = $("#wrapper > #regionMain > #content > #article > #libraryNav > .completeList").find(`ul > li > a[data-locale=${lang}]`).attr('data-meps-symbol');

  return language;
}

app.get('/', async (req: Request, res: Response) => {
  const date = req.query.date ? moment(new Date(req.query.date as string)).format("YYYYMMDD") : moment().format("YYYYMMDD");
  const lang = await getLanguage(req.query.lang as string);
  if (!lang) res.status(400).send("The language you requested does not exist. Please try again using a supported language.");
  const url = `https://www.jw.org/finder?srcid=jwlshare&wtlocale=${lang}&alias=daily-text&date=${date}`;
  const rawData = await axios(url).then((res) => res.data);

  const $ = load(rawData);
  const text = $(".dailyText .articlePositioner").find(".tabContent:nth-child(2) > p.themeScrp > em").text().replaceAll(" ", "").replace(" ()", "");
  const verse = $(".dailyText .articlePositioner").find(".tabContent:nth-child(2) > p.themeScrp > a > em").text();
  const comentary = $(".dailyText .articlePositioner").find(".tabContent:nth-child(2) > .bodyTxt > .section > .pGroup > p.sb").text().split(". w")[0] + ".";
  const comentarySource = `https://wol.jw.org${$(".dailyText .articlePositioner").find(".tabContent:nth-child(2) > .bodyTxt > .section > .pGroup > p.sb > a:last-of-type").attr('href')}`;

  res.setHeader("Access-Control-Allow-Origin", "*")
  res.statusCode = 200;
  res.send(JSON.stringify({ verse, text, comentary, comentarySource, url }));
});

app.listen(5000, () => console.log("The API is up and running 🚀"));