const {
  fetchArticles,
  countArticles,
  fetchArticleById,
  voteUpArticleByID,
  voteDownArticleByID,
} = require('../db/models/articles');

const getArticles = (req, res, next) => {
  const { params } = req;
  const queriesObject = req.query;
  return Promise.all([fetchArticles(params, queriesObject), countArticles(params)])
    .then(([articles, article_count]) => {
      const totalCountString = article_count[0].total_count;
      const total_count = +totalCountString;
      res.status(200).send({ total_count, articles });
    })
    .catch(next);
};

const getArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  const queriesObject = req.query;
  return fetchArticleById(article_id, queriesObject)
    .then(([article]) => {
      if (!article) return next({ status: 404, message: 'no article of this ID found' });
      return res.status(200).send({ article });
    })
    .catch(next);
};

const patchArticleByID = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  if (+inc_votes > 0) {
    return voteUpArticleByID(article_id, 1).then(([votedArticle]) => {
      res.status(202).send({ votedArticle });
    });
  }
  if (+inc_votes < 0) {
    return voteDownArticleByID(article_id, 1).then(([votedArticle]) => {
      res.status(202).send({ votedArticle });
    });
  }
  next({ status: 400, code: '22P02' });
};
//
//   return fetchArticleById(article_id, queriesObject)
//     .then((article) => {
//       updateArticleByID(article, inc_votes);
//     })
//     .then(response => console.log('response:', response))
//     .catch(next);
// };

module.exports = { getArticles, getArticleByID, patchArticleByID };
