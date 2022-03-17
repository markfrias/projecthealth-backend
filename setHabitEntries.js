const cron = require('node-cron');
const { addJournalEntries } = require('./controllers/habit.controller');

// Set daily missions for all users at midnight GMT+08:00
const addHabitEntries = () => {
    cron.schedule('0 0 * * *', () => {
        addJournalEntries();

    }, {
        scheduled: true,
        timezone: 'Asia/Manila'
    })
};
module.exports = {
    addHabitEntries
}