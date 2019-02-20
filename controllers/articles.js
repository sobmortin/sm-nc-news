const {
  fetchArticles,
  countArticles,
  fetchArticleById,
  voteUpArticleByID,
  voteDownArticleByID,
  removeArticleByID,
  fetchCommentByArticleID,
  addCommentToArticleID,
  voteUpCommentByID,
  voteDownCommentByID,
  removeCommentByID,
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
      res.status(200).send({ votedArticle });
    });
  }
  if (+inc_votes < 0) {
    return voteDownArticleByID(article_id, 1).then(([votedArticle]) => {
      res.status(200).send({ votedArticle });
    });
  }
  next({ status: 400, code: '22P02' });
};

const deleteArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  removeArticleByID(article_id)
    .then(() => res.status(204).send({ message: 'no content' }))
    .catch(next);
};

const getCommentByArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const queriesObject = req.query;
  return fetchCommentByArticleID(article_id, queriesObject)
    .then(comments => res.status(200).send({ comments }))
    .catch(next);
};

const postCommentToArticleID = (req, res, next) => {
  const { article_id } = req.params;
  addCommentToArticleID({ ...req.body, article_id })
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

const patchCommentVote = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;
  const { article_id } = req.params;
  if (+inc_votes > 0) {
    return voteUpCommentByID(+comment_id, +article_id)
      .then(([votedComment]) => {
        res.status(200).send({ votedComment });
      })
      .catch(next);
  }
  if (+inc_votes < 0) {
    return voteDownCommentByID(comment_id, article_id)
      .then(([votedComment]) => {
        res.status(200).send({ votedComment });
      })
      .catch(next);
  }
  next({ status: 400, code: '22P02' });
};

const deleteCommentById = (req, res, next) => {
  const { article_id } = req.params;
  const { comment_id } = req.params;
  removeCommentByID(article_id, comment_id)
    .then((response) => {
      res.status(204).send({ message: 'comment deleted' });
    })
    .catch(next);
};

module.exports = {
  getArticles,
  getArticleByID,
  patchArticleByID,
  deleteArticleByID,
  getCommentByArticleID,
  postCommentToArticleID,
  patchCommentVote,
  deleteCommentById,
};
