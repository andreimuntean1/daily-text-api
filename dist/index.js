"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cheerio_1 = require("cheerio");
const moment_1 = __importDefault(require("moment"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.get('/', async (req, res) => {
    const date = req.query.date ? (0, moment_1.default)(new Date(req.query.date)).format("YYYYMMDD") : (0, moment_1.default)().format("YYYYMMDD");
    const url = `https://www.jw.org/finder?srcid=jwlshare&wtlocale=M&prefer=lang&alias=daily-text&date=${date}`;
    const rawData = await (0, axios_1.default)(url, {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
    }).then((res) => res.data);
    const $ = (0, cheerio_1.load)(rawData);
    const text = $(".dailyText .articlePositioner").find(".tabContent:nth-child(2) > p.themeScrp > em").text().replaceAll(" ", "").replace(" ()", "");
    const verse = $(".dailyText .articlePositioner").find(".tabContent:nth-child(2) > p.themeScrp > a > em").text();
    const comentary = $(".dailyText .articlePositioner").find(".tabContent:nth-child(2) > .bodyTxt > .section > .pGroup > p.sb").text();
    res.statusCode = 200;
    res.send(JSON.stringify({ verse, text, comentary, url }));
});
app.listen(3000, () => console.log("The API is up and running 🚀"));
