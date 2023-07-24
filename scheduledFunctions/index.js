import CronJob from "node-cron";

const CHANNEL_ID = "@testbotportugal";

export const initScheduledJobs = (bot, nextWeekDate, nextWeekEndDate) => {
  const scheduledJobFunction = CronJob.schedule("*/1 * * * *", () => {
    console.log("HERE12");
    bot.telegram.sendPoll(CHANNEL_ID, `Que dia da semana vamos jogar padel ${nextWeekDate.getDate()}/${nextWeekDate.getMonth()} to ${nextWeekEndDate.getDate()}/${nextWeekEndDate.getMonth()}`, ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"], { allows_multiple_answers: true, is_anonymous: false})
  });
  scheduledJobFunction.start();
}