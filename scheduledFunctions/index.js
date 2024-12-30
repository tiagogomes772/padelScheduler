import CronJob from "node-cron";
import { getNextMonday, getNextSunday } from "../utils/index.js";

const CHANNEL_ID = "@testbotportugal";

export const initScheduledJobs = (bot) => {
  const nextWeekDate = getNextMonday();
    const nextWeekEndDate = getNextSunday(nextWeekDate);
    bot.telegram.sendPoll(CHANNEL_ID, `Que dia da semana vamos jogar ${nextWeekDate.getDate()}/${nextWeekDate.toLocaleString('default', { month: 'long' })} to ${nextWeekEndDate.getDate()}/${nextWeekEndDate.toLocaleString('default', { month: 'long' })}`, ["Nao posso", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"], { allows_multiple_answers: true, is_anonymous: false})
}
