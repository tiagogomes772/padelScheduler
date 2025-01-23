import TelegramBot from 'node-telegram-bot-api';
const token = process.env.BOT_TOKEN; // Replace with your bot's token
const bot = new TelegramBot(token, { polling: true });

const pollInterval = 7 * 24 * 60 * 60 * 1000; // 1 week in milliseconds
const chatId = process.env.CHAT_ID;// Replace with your target chat/group ID

// Store active polls
let activePolls = {};

// Function to send a poll
function sendWeeklyPoll() {
    const question = "Qual dia da semana você prefere?";
    const options = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado", "Domingo"];

    bot.sendPoll(chatId, question, options, { is_anonymous: false, allows_multiple_answers: true }).then((pollMessage) => {
        const pollId = pollMessage.poll.id;
        activePolls[pollId] = {
            messageId: pollMessage.message_id,
            votes: 0,
            voters: [],
            results: {},
            endTime: Date.now() + pollInterval
        };

        // Set a timeout to close the poll after 1 week
        setTimeout(() => {
            if (activePolls[pollId]) {
                closePoll(pollId);
            }
        }, pollInterval);
    });
}

// Function to close a poll
function closePoll(pollId) {
    const poll = activePolls[pollId];
    if (poll) {
        bot.stopPoll(chatId, poll.messageId).then((stoppedPoll) => {
            const voters = poll.voters.join(', ') || "Nenhuma pessoa votou.";

            // Collect options with votes
            const optionsWithVotes = stoppedPoll.options
                .filter(option => option.voter_count > 0)
                .map(option => `${option.text}: ${option.voter_count} votos`)
                .join(', ');

            bot.sendMessage(chatId, `A enquete foi encerrada. Pessoas que participaram: ${voters}. Resultados: ${optionsWithVotes}`);
            delete activePolls[pollId];
            console.log(`Poll ${pollId} closed.`);
        });
    }
}

// Handle poll updates
bot.on('poll_answer', (pollAnswer) => {
    const pollId = pollAnswer.poll_id;
    const poll = activePolls[pollId];

    if (poll) {
        const voterName = pollAnswer.user.first_name;
        if (!poll.voters.includes(voterName)) {
            poll.voters.push(voterName);
            poll.votes++;
        }

        // Track votes per option
        pollAnswer.option_ids.forEach(optionId => {
            poll.results[optionId] = (poll.results[optionId] || 0) + 1;
        });

        // Close the poll if 4 people have voted
        if (poll.votes >= 1) {
            closePoll(pollId);
        }
    }
});

// Start sending weekly polls
sendWeeklyPoll();
setInterval(sendWeeklyPoll, pollInterval);
