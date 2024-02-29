// Import axios at first
const axios = require('axios');

module.exports = async function (params, context) {
  try {
    // Send a GET request with query params
    // Note to replace the URL with your one
    const root_url = 'https://leetcode-api-omega.vercel.app';
    const response = await axios.get(root_url + '/daily');
    result = response.data;
    topicTags = result.topicTags;
    var tagTranslated = [];

    for (var i = 0; i < topicTags.length; i++) {
      var tag = topicTags[i].nameTranslated;
      tagTranslated.push(tag);
    }

    let message = {
      question_id: result.questionLink,
      question_title: result.questionTitle,
      question_title_cn: result.titleCn,
      question_difficulty: result.difficulty,
      question_url: result.questionLink,
      tags: tagTranslated,
      date: result.date,
    };
    return message
  } catch (error) {
    console.log('Something wrong:', error.message);
    return {
      error: error.message,
    };
  }
};