const schedule = require('node-schedule');

// var date = new Date(new Date().getTime() + 1 * 1000 * 30);
// var date2 = new Date('2015/1/31 21:28:00');
// console.log(new Date());
// console.log('j will start at:', date);

//#region cron 懶人包
// 每五分鐘執行 * /5 * * * *

// 每小時執行     0 * * * *

// 每天執行        0 0 * * *

// 每週執行       0 0 * * 0

// 每月執行        0 0 1 * *

// 每年執行       0 0 1 1 *

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week(0 - 7)(0 or 7 is Sun)
// │    │    │    │    └───── month(1 - 12)
// │    │    │    └────────── day of month(1 - 31)
// │    │    └─────────────── hour(0 - 23)
// │    └──────────────────── minute(0 - 59)
// └───────────────────────── second(0 - 59, OPTIONAL)


//#endregion

exports.allJObInit = async function (parameter) {
    
    if (parameter == 'first') {
        
    }
    // schedule.scheduleJob('*/1 * * * *', function () {
    //     console.log('testJob:', ' tetete');
    // });
    // await oneminuteJOb();
    // await tenminuteJOb();
}

const oneminuteJOb = async () => {
    schedule.scheduleJob('*/1 * * * *', function () {
    });
}
const tenminuteJOb = async () => {
    schedule.scheduleJob('*/10 * * * *', function () {
    });
}
const onehourJOb = async () => {

}
const sixhourJOb = async () => {

}
// async function testJOb() {
//     schedule.scheduleJob('* * * * * *', function () {
//         console.log('testJob:', ' tetete');
//     });
// }


// var j = schedule.scheduleJob({ hour: 14, minute: 30, dayOfWeek: 0 }, function () {
//     console.log('Time for tea!');
// });
// j.cancel();
