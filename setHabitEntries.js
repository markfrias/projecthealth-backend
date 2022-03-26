const cron = require('node-cron');
const { addCalendarEntry } = require('./controllers/food.controller');
const { addJournalEntries } = require('./controllers/habit.controller');
const { updateWeightFromYesterday } = require('./controllers/users.controller');

// Set daily missions for all users at midnight GMT+08:00
const addHabitEntries = () => {
    cron.schedule('2 0 * * *', () => {
        addJournalEntries();

    }, {
        scheduled: true,
        timezone: 'Asia/Manila'
    })

    cron.schedule('05 0 * * *', () => {
        addCalendarEntry();
    }, {
        scheduled: true,
        timezone: 'Asia/Manila'
    })

    cron.schedule('07 0 * * *', () => {
        updateWeightFromYesterday();
        console.log("yeet")

    }, {
        scheduled: true,
        timezone: 'Asia/Manila'
    })

};
module.exports = {
    addHabitEntries
}