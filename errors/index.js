exports.handle404 = (err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ message: err.message });
  else next(err);
};

exports.handle400 = (err, req, res, next) => {
  const { code } = err;
  const codes = {
    42703: 'bad syntax in post request',
    23505: 'breaking unique limitations',
  };
  if (codes.hasOwnProperty(code)) res.status(400).send({ message: codes[code] });
  else next(err);
};
