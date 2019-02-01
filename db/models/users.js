const connection = require('../connection');

exports.fetchUsers = () => connection.select('*').from('users');

exports.fetchUserByUsername = username => connection
  .select('*')
  .from('users')
  .where('users.username', '=', username);

exports.fetchArticlesByUser = (
  username,
  {
    limit = 10, sort_by = 'created_at', order_by = 'desc', p = 1,
  },
) => connection
  .select(
    'articles.username as author',
    'articles.title',
    'articles.article_id',
    'articles.votes',
    'articles.created_at',
    'articles.topic',
  )
  .count('comments.article_id AS comment_count')
  .from('articles')
  .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
  .groupBy('articles.article_id')
  .offset(limit * (p - 1))
  .limit(limit)
  .orderBy(sort_by, order_by)
  .where('articles.username', '=', username);

// {
//   limit = 10, sort_by = 'created_at', order_by = 'desc', p = 1,
//   },
// ) => connection
//   .select(
//     'articles.topic',
//     'articles.article_id',
//     'articles.title',
//     'articles.username AS author',
//     'articles.votes',
//     'articles.created_at',
//   )
//   .count('comments.article_id AS comment_count')
//   .from('articles')
//   .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
//   .groupBy('articles.article_id')
//   .offset(limit * (p - 1))
//   .limit(limit)
//   .orderBy(sort_by, order_by)
//   .where('topic', '=', param);

exports.countArticlesByUser = username => connection('articles')
  .count('*')
  .where('username', '=', username);
