import CronJob from "node-cron";
import { getNextMonday, getNextSunday } from "../utils/index.js";

const CHANNEL_ID = "@testbotportugal";

export const initScheduledJobs = (bot) => {
  const scheduledJobFunction = CronJob.schedule("*/1 * * * *", () => {
    const nextWeekDate = getNextMonday();
    const nextWeekEndDate = getNextSunday(nextWeekDate);
    bot.telegram.sendPoll(CHANNEL_ID, `Que dia da semana vamos jogar padel ${nextWeekDate.getDate()}/${nextWeekDate.getMonth()} to ${nextWeekEndDate.getDate()}/${nextWeekEndDate.getMonth()}`, ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"], { allows_multiple_answers: true, is_anonymous: false})
  });
  scheduledJobFunction.start();
}
