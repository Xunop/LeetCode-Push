// Import axios at first
const axios = require('axios');
const aircode = require('aircode');

module.exports = async function (params, context) {
  try {
    let user = params.user.trim();
    const calRes = await axios.get(
      `https://leetcode-api-omega.vercel.app/${user}/calendar`
    );
    const subRes = await axios.get(
      `https://leetcode-api-omega.vercel.app/${user}/submission`
    );
    let calData = calRes.data.submissionCalendar;
    var currentDate = new Date();
    currentDate.setUTCHours(0, 0, 0, 0);
    currentDate.setUTCHours(0);
    var today = Math.floor(currentDate.getTime() / 1000);
    var eigthhours = 8 * 60 * 60;
    var zero = today - eigthhours;

    calData = JSON.parse(calData);
    let allSubmit = 0;
    let status = 'false';
    if (calData.hasOwnProperty(today.toString())) {
      allSubmit = calData[today];
      status = 'true';
    }
    let subData = subRes.data;
    let subCount = subData.count;
    let submissions = subData.submission;
    let validSub = 0;
    for (var i = 0; i < subCount; i++) {
      submission = submissions[i];
      subTime = submission.submitTime;
      if (parseInt(subTime) > today) {
        validSub++;
      }
    }
    const recordsTable = aircode.db.table('records');
    oldRecord = await recordsTable.where({ name: user }).findOne();
    if (oldRecord == null) {
        oldRecord = {
            name: user,
        }
    }
    oldRecord.status = status
    oldRecord.validSubmit = validSub
    oldRecord.allSubmit = allSubmit
    const tabRes = await recordsTable.save(oldRecord);
    return {
      tabRes,
    }
  } catch (error) {
    console.log('Something wrong:', error.message);
    return {
      error: error.message,
    };
  }
};
