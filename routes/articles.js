const articlesRouter = require('express').Router();
const { handle405 } = require('../errors/index');
const {
  getArticles,
  getArticleByID,
  patchArticleByID,
  deleteArticleByID,
  getCommentByArticleID,
  postCommentToArticleID,
  patchCommentVote,
  deleteCommentById,
} = require('../controllers/articles');

articlesRouter
  .route('/')
  .get(getArticles)
  .all(handle405);

articlesRouter
  .route('/:article_id')
  .get(getArticleByID)
  .patch(patchArticleByID)
  .delete(deleteArticleByID)
  .all(handle405);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentByArticleID)
  .post(postCommentToArticleID)
  .all(handle405);

articlesRouter
  .route('/:article_id/comments/:comment_id')
  .patch(patchCommentVote)
  .delete(deleteCommentById)
  .all(handle405);

module.exports = articlesRouter;
