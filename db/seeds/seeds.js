const { topicData, userData, articleData, commentData } = require("../data");
const {
  formatDateStamps,
  createRef,
  createCommentsObject
} = require("../utils/utils");

// console.log("topicdata", topicData);
//console.log("articledata", articleData);

exports.seed = (connection, Promise) => {
  return (
    connection
      .insert(topicData)
      .into("topics")
      .returning("*")
      //topics have been done
      .then(() => {
        return connection
          .insert(userData)
          .into("users")
          .returning("*");
      })
      //users have been done
      .then(() => {
        // console.log(userRows);
        const formattedArticles = formatDateStamps(articleData);
        // console.log(formattedArticles);
        return connection
          .insert(formattedArticles)
          .into("articles")
          .returning("*");
        //articles have been done
      })
      .then(articleRows => {
        console.log(articleRows);
        const commentsRef = createRef(articleRows);
        const commentsObj = createCommentsObject(commentsRef, commentData);
        return connection
          .insert(commentsObj)
          .into("comments")
          .returning("*");
      })
  );
};
