import express, { Express, Request, Response } from "express";
import { load } from "cheerio";
import moment from "moment";
import axios from "axios";

const app: Express = express();

app.get('/', async (req: Request, res: Response) => {
  const date = req.query.date ? moment(new Date(req.query.date as string)).format("YYYYMMDD") : moment().format("YYYYMMDD");
  const url = `https://www.jw.org/finder?srcid=jwlshare&wtlocale=M&prefer=lang&alias=daily-text&date=${date}`;
  const rawData = await axios(url, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).then((res) => res.data);

  const $ = load(rawData);
  const text = $(".dailyText .articlePositioner").find(".tabContent:nth-child(2) > p.themeScrp > em").text().replaceAll(" ", "").replace(" ()", "");
  const verse = $(".dailyText .articlePositioner").find(".tabContent:nth-child(2) > p.themeScrp > a > em").text();
  const comentary = $(".dailyText .articlePositioner").find(".tabContent:nth-child(2) > .bodyTxt > .section > .pGroup > p.sb").text();

  res.statusCode = 200;
  res.send(JSON.stringify({ verse, text, comentary, url }));
});

app.listen(3000, () => console.log("The API is up and running 🚀"));