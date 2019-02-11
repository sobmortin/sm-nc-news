const { endpoints } = require('../routes/endpoints');

const getRoutes = (req, res, next) => {
  res.status(200).send({ endpoints });
};

module.exports = getRoutes;
