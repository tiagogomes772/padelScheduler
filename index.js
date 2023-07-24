// imports
import {} from 'dotenv/config'
import express from 'express';
import { initScheduledJobs } from "./scheduledFunctions/index.js";
import { Telegraf } from "telegraf";

const expressApp = express();

expressApp.use(express.static('static'))
expressApp.use(express.json());


const bot = new Telegraf(process.env.BOT_TOKEN);

bot.launch()

initScheduledJobs(bot);
