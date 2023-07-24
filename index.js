// imports
import {} from 'dotenv/config'
import express from 'express';
import { initScheduledJobs } from "./scheduledFunctions/index.js";
import { Telegraf } from "telegraf";
import { getNextMonday, getNextSunday } from "./utils/index.js";

const expressApp = express();

expressApp.use(express.static('static'))
expressApp.use(express.json());


const bot = new Telegraf(process.env.BOT_TOKEN);
const nextWeekDate = getNextMonday();
const nextWeekEndDate = getNextSunday(nextWeekDate);
bot.launch()

initScheduledJobs(bot, nextWeekDate, nextWeekEndDate);
