// Import axios at first
const axios = require('axios');

module.exports = async function (params, context) {
  try {
    let user = params.user.trim()
    const result = await axios.get(
      `https://leetcode-api-omega.vercel.app/${user}/solved`
    );
    let data = result.data
    questions = data.acceptedQuestion
    res = new Map()
    for (var i = 0; i < questions.length; i++) {
      var question = questions[i]
      difficulty = question.difficulty
      count = question.count
      res.set(difficulty, count)
    }
    return JSON.stringify(Object.fromEntries(res))
  } catch (error) {
    console.log('Something wrong:', error.message);
    return {
      error: error.message,
    };
  }
};
