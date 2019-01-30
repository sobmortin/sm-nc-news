const { fetchArticles, countArticles, fetchArticleById } = require('../db/models/articles');

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
  const { params } = req;
  const queriesObject = req.query;
  return Promise.all([fetchArticleById(params, queriesObject)])
    .then((article) => {
      console.log(article);
      res.status(200).send({ article });
    })
    .catch(next);
};

module.exports = { getArticles, getArticleByID };
