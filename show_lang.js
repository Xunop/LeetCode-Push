// Import axios at first
const axios = require('axios');

module.exports = async function (params, context) {
  try {
    let user = params.user.trim()
    const result = await axios.get(
      `https://leetcode-api-omega.vercel.app/${user}/lang`
    );
    let data = result.data
    langs = data.userLanguageProblemCount
    res = new Map()
    for (var i = 0; i < langs.length; i++) {
      var lang = langs[i]
      name = lang.languageName
      count = lang.problemsSolved
      res.set(name, count)
    }
    return JSON.stringify(Object.fromEntries(res))
  } catch (error) {
    console.log('Something wrong:', error.message);
    return {
      error: error.message,
    };
  }
};
