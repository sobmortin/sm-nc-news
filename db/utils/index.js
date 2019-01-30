// formatDateStamps  takes  array of objects and converts js timestamp to readable date

exports.formatDateStamps = data => data.map(({ created_by, ...article }) => {
  const formattedArticle = {
    ...article,
    username: created_by,
    created_at: new Date(article.created_at),
  };
  return formattedArticle;
});

// createRef creates a reference to the id column of a table
exports.createRef = data => data.reduce((refObj, { article_id, title }) => {
  refObj[title] = article_id;
  return refObj;
}, {});

// uses refObj from createRef to create correct comments object
exports.formatComments = (refObj, comments) => comments.map(({
  belongs_to, created_at, created_by, ...restOfComment
}) => ({
  ...restOfComment,
  username: created_by,
  article_id: refObj[belongs_to],
  created_at: new Date(created_at).toDateString(),
}));
