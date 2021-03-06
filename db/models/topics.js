const connection = require('../connection');

exports.fetchTopics = () => connection.select('*').from('topics');

exports.addTopics = body => connection('topics')
  .insert(body)
  .returning('*');

exports.fetchArticlesByTopic = (
  param,
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
  )
  .count('comments.article_id AS comment_count')
  .from('articles')
  .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
  .groupBy('articles.article_id')
  .offset(limit * (p - 1))
  .limit(limit)
  .orderBy(sort_by, order_by)
  .where('topic', '=', param);

exports.countArticlesByTopic = topic => connection('articles')
  .count('* as total_count')
  .where('topic', '=', topic);

exports.addArticleByTopic = body => connection('articles')
  .insert(body)
  .returning('*');
