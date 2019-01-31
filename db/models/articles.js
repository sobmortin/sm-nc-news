const connection = require('../connection');

exports.fetchArticles = (
  params,
  {
    limit = 10, sort_by = 'created_at', order_by = 'desc', p = 1,
  },
) => connection
  .select(
    'articles.topic',
    'articles.article_id',
    'articles.title',
    'articles.username AS author',
    'articles.votes',
    'articles.created_at',
    'articles.body',
  )
  .count('comments.article_id AS comment_count')
  .from('articles')
  .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
  .groupBy('articles.article_id')
  .offset(limit * (p - 1))
  .limit(limit)
  .orderBy(sort_by, order_by);

exports.fetchArticleById = (params, { sort_by = 'created_at', order_by = 'desc' }) => connection
  .select(
    'articles.topic',
    'articles.article_id',
    'articles.title',
    'articles.username AS author',
    'articles.votes',
    'articles.created_at',
    'articles.body',
  )
  .count('comments.article_id AS comment_count')
  .from('articles')
  .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
  .groupBy('articles.article_id')
  .where('articles.article_id', '=', params)
  .orderBy(sort_by, order_by);

exports.countArticles = () => connection('articles').count('* as total_count');

exports.voteUpArticleByID = articleID => connection('articles')
  .where('articles.article_id', '=', articleID)
  .increment('votes', 1)
  .then(() => connection
    .select('*')
    .from('articles')
    .where('articles.article_id', '=', articleID));

exports.voteDownArticleByID = articleID => connection('articles')
  .where('articles.article_id', '=', articleID)
  .decrement('votes', 1)
  .then(() => connection
    .select('*')
    .from('articles')
    .where('articles.article_id', '=', articleID));

exports.removeArticleByID = articleID => connection('comments')
  .del()
  .where('comments.article_id', '=', articleID)
  .then(() => connection('articles')
    .del()
    .where('articles.article_id', '=', articleID));

exports.fetchCommentByArticleID = (
  articleID,
  {
    limit = 10, sort_by = 'created_at', order_by = 'desc', p = 1,
  },
) => connection
  .select('comment_id', 'votes', 'created_at', 'username as author', 'body')
  .from('comments')
  .offset(limit * (p - 1))
  .limit(limit)
  .orderBy(sort_by, order_by)
  .where('article_id', '=', articleID);

exports.addCommentToArticleID = comment => connection('comments')
  .insert(comment)
  .returning('*');

// exports.updateCommentVote = (vote) => {};

exports.voteUpCommentByID = (commentID, articleID, next) => connection('comments')
  .where('comments.comment_id', '=', commentID)
  .andWhere('comments.article_id', articleID)
  .increment('votes', 1)
  .then((res) => {
    if (!res) return Promise.reject({ status: 404, message: 'not found' });
    if (res) {
      return connection
        .select('*')
        .from('comments')
        .where('comments.comment_id', '=', commentID)
        .andWhere('comments.article_id', articleID);
    }
  });

exports.voteDownCommentByID = (commentID, articleID) => connection('comments')
  .where('comments.comment_id', '=', commentID)
  .andWhere('comments.article_id', articleID)
  .decrement('votes', 1)
  .then((res) => {
    if (!res) return Promise.reject({ status: 404, message: 'not found' });
    if (res) {
      return connection
        .select('*')
        .from('comments')
        .where('comments.comment_id', '=', commentID)
        .andWhere('comments.article_id', articleID);
    }
  });

exports.removeCommentByID = (commentID, articleID) => connection('comments')
  .where('comments.comment_id', '=', commentID)
  .andWhere('comments.article_id', articleID)
  .del()
  .returning('*');

// exports.removeArticleByID = articleID => connection('comments')
//   .del()
//   .where('comments.article_id', '=', articleID)
//   .then(() => connection('articles')
//     .del()
//     .where('articles.article_id', '=', articleID));
