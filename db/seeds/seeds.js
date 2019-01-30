const {
  topicData, userData, articleData, commentData,
} = require('../data');
const { formatDateStamps, createRef, formatComments } = require('../utils');

// what is happening in this file

exports.seed = (connection, Promise) => connection
  .insert(topicData)
  .into('topics')
  .returning('*')
  .then(() => connection
    .insert(userData)
    .into('users')
    .returning('*'))
  // users have been done
  .then(() => {
    const formattedArticles = formatDateStamps(articleData);
    return connection
      .insert(formattedArticles)
      .into('articles')
      .returning('*');
    // articles have been done
  })
  .then((articleRows) => {
    const articleRefs = createRef(articleRows);
    const formattedCommentsArray = formatComments(articleRefs, commentData);
    return connection
      .insert(formattedCommentsArray)
      .into('comments')
      .returning('*');
  });
