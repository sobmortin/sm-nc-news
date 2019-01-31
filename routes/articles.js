const articlesRouter = require('express').Router();
const { getArticles, getArticleByID, patchArticleByID } = require('../controllers/articles');

articlesRouter.route('/').get(getArticles);
articlesRouter
  .route('/:article_id')
  .get(getArticleByID)
  .patch(patchArticleByID);

module.exports = articlesRouter;
