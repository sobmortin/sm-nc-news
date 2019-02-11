exports.endpoints = {
  'GET api/topics': 'returns all topics',
  'GET api/topics/:topic/articles': 'returns articles by topic',
  'GET api/articles': 'returns all articles',
  'GET api/articles/article_id': 'returns article by id',
  'GET api//articles/:article_id/comments': 'returns all comments by article_id',
  'GET api/articles/:article_id/comments/:comment_id':
		'returns comment by comment_id and corresponding article_id',
  'GET api/users': 'returns all users',
  'GET /api/users/:username': 'returns user by username',
  'GET /api/users/:username/articles': 'returns articles by username',
  'POST /api/topics':
		'accepts an object containing unique `slug` and `description` property - responds with  posted object',
  'POST /api/topics/:topic/articles':
		'accepts an object containing a `title` , `body`,`username` property - responds with posted article',
  'POST /api/articles/:article_id/comments':
		"accepts an object with a `username` and `body' - responds with the posted comment",
  'POST /api/users':
		'accepts an object containing a `username` , `avatar_url` and a `name` propert - responds with the posted user',
  'PATCH /api/articles/:article_id':
		'request body accepts an object in the form { inc_votes: newVote }',
  'PATCH /api/articles/:article_id/comments/:comment_id':
		'request body accepts an object in the form `{ inc_votes: newVote }`',
  'DELETE /api/articles/:article_id': 'should delete the given article by `article_id`',
  'DELETE /api/articles/:article_id/comments/:comment_id':
		'should delete the given comment by `comment_id`',
};
