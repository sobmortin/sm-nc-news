const articlesRouter = require('express').Router();
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

articlesRouter.route('/').get(getArticles);

articlesRouter
  .route('/:article_id')
  .get(getArticleByID)
  .patch(patchArticleByID)
  .delete(deleteArticleByID);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentByArticleID)
  .post(postCommentToArticleID);

articlesRouter
  .route('/:article_id/comments/:comment_id')
  .patch(patchCommentVote)
  .delete(deleteCommentById);

module.exports = articlesRouter;
