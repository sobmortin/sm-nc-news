\c nc_news_test;

SELECT * FROM articles
WHERE articles.article_id = 3;




-- -- UPDATE articles 
-- -- SET votes = 1;

-- SELECT *  FROM articles
-- UPDATE articles
-- SET votes = 1
-- WHERE articles.article_id = 1;

-- SELECT * FROM articles
-- WHERE articles.article_id = 1;

-- -- trying to find total number of articles returned by topic search - this will come in the array as a separate object

-- -- SELECT count(*) AS total_count FROM articles WHERE articles.topic = 'mitch';

-- --trying to find total number of comments on any article - this will come in each article object

-- -- SELECT * FROM articles;

-- SELECT articles.topic, articles.article_id, articles.title, articles.created_by AS author, articles.votes, articles.created_at,  COUNT(comments.article_id) AS comment_count FROM articles
-- LEFT JOIN comments
-- ON articles.article_id = comments.article_id
-- GROUP BY articles.article_id;

-- connection
-- .select ('articles.topic', 'articles.article_id', 'articles.title', 'articles.created_by AS author', 'articles.votes', 'articles.created_at')
-- .count('comments.article_id AS comment_count')
-- from('articles')
-- .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
--  .limit(limit)
--   .orderBy(sort_by, order_by)
--   .where('topic', '=', param);

-- -- select('parties.party, parties.founded')
-- -- .count('mps.mp_id as mp_count ')
-- -- .leftJoin('mps, parties.party', '=', 'mps.party')
-- -- .from('parties')
-- -- .limit('limit')
-- -- .groupBy('parties.party')
-- -- .orderBy()

-- -- SELECT parties.party, parties.founded, COUNT (mps.mp_id) AS mp_count FROM parties
-- -- LEFT JOIN mps
-- -- ON parties.party = mps.party
-- -- GROUP BY parties.party
-- -- ORDER BY parties.founded DESC,
-- -- parties.party ASC
-- -- LIMIT 10;

-- -- SELECT username, count(comments.article_id) as comment_count FROM comments
-- -- LEFT JOIN articles
-- -- ON comments.article_id = articles.article_id
-- -- GROUP BY comments.article_id;