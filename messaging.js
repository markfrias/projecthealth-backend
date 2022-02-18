const { admin } = require('./firebase')
const cron = require('node-cron');
const { triggerMidnightNotif, triggerOneNotif, triggerTwoNotif, triggerThreeNotif, triggerFourNotif, triggerFiveNotif, triggerSixNotif, triggerSevenNotif, triggerEightNotif, triggerNineNotif, triggerTenNotif, triggerElevenNotif, triggerTwelveNotif, triggerThirteenNotif, triggerFourteenNotif, triggerFifteenNotif, triggerSixteenNotif, triggerSeventeenNotif, triggerEighteenNotif, triggerNineteenNotif, triggerTwentyNotif, triggerTwentyOneNotif, triggerTwentyTwoNotif, triggerTwentyThreeNotif } = require('./scheduledMessages');

// Calls all notification schedulers
const startMessageService = () => {

    // Initialize time-sensitive topic notifications
    triggerMidnightNotif();
    triggerOneNotif();
    triggerTwoNotif();
    triggerThreeNotif();
    triggerFourNotif();
    triggerFiveNotif();
    triggerSixNotif();
    triggerSevenNotif();
    triggerEightNotif();
    triggerNineNotif();
    triggerTenNotif();
    triggerElevenNotif();
    triggerTwelveNotif();
    triggerThirteenNotif();
    triggerFourteenNotif();
    triggerFifteenNotif();
    triggerSixteenNotif();
    triggerSeventeenNotif();
    triggerEighteenNotif();
    triggerNineteenNotif();
    triggerTwentyNotif();
    triggerTwentyOneNotif();
    triggerTwentyTwoNotif();
    triggerTwentyThreeNotif();
}

module.exports = {
    startMessageService
}