const connection = require('../connection');

exports.fetchTopics = () => connection.select('*').from('topics');

exports.addTopics = body => connection('topics')
  .insert(body)
  .returning('*');

exports.fetchArticlesByTopic = (
  param,
  { limit = 10, sort_by = 'created_at', order_by = 'desc' },
) => {
  // console.log(limit);
  return connection
    .select('topic', 'created_by as author', 'title', 'article_id', 'votes', 'created_at')
    .from('articles')
    .limit(limit)
    .orderBy(sort_by, order_by)
    .where('topic', '=', param);
};

// KNEX LEFT JOIN TEMPLATE
// connection
//   .select('parties.party, parties.founded')
//   .count('mps.mp_id as mp_count ')
//   .leftJoin('mps, parties.party', '=', 'mps.party')
//   .from('parties')
//   .limit('limit')
//   .groupBy('parties.party')
//   .orderBy();

// 'created_by as author',
//   'title',
//   'article_id',
//   'votes',
//   'comment_count',
//   'created_at',
//   'topic'
// .leftJoin('comments', 'comments.belongs_to', '=', 'articles.title')
