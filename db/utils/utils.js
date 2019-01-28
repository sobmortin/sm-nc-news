///formatDateStamps function takes an array of objects and converts js timestamp to readable date and time
exports.formatDateStamps = data => {
  return data.map(article => {
    const formattedArticle = {
      ...article,
      created_at: new Date(article.created_at).toDateString()
    };
    return formattedArticle;
  });
};
// createRef creates a reference to the id column of a table
exports.createRef = data => {
  // console.log(data);
  return data.reduce((refObj, { article_id, title }) => {
    refObj[title] = article_id;
    return refObj;
  }, {});
};

exports.createCommentsObject = (refObj, comments) =>
  comments.map(({ belongs_to, created_at, created_by, ...restOfComment }) => ({
    ...restOfComment,
    username: created_by,
    article_id: refObj[belongs_to],
    created_at: new Date(created_at).toDateString()
  }));
