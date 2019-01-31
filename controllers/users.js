const {
  fetchUsers,
  fetchUserByUsername,
  fetchArticlesByUser,
  countArticlesByUser,
} = require('../db/models/users');

const getUsers = (req, res, next) => fetchUsers()
  .then((users) => {
    res.status(200).send({ users });
  })
  .catch(next);

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  return fetchUserByUsername(username)
    .then(([user]) => {
      if (!user) return next({ status: 404, message: 'user not found' });
      return res.status(200).send({ user });
    })
    .catch(next);
};

const getArticlesByUser = (req, res, next) => {
  const { username } = req.params;
  const queriesObj = req.query;
  console.log(queriesObj);
  return Promise.all([fetchArticlesByUser(username), countArticlesByUser(username, queriesObj)])
    .then(([articles, article_count]) => {
      const total_articles = article_count[0].count;
      return res.status(200).send({ total_articles, articles });
    })
    .catch(next);
};

module.exports = { getUsers, getUserByUsername, getArticlesByUser };
