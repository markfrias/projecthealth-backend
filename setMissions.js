const cron = require('node-cron');
const { addJournalEntries } = require('./controllers/missions.controller');

// Set daily missions for all users at midnight GMT+08:00
const changeMissions = () => {
    cron.schedule('01 0 * * *', () => {
        addJournalEntries();

    }, {
        scheduled: true,
        timezone: 'Asia/Manila'
    })
};
module.exports = {
    changeMissions
}