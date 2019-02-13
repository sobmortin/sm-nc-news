exports.handle404 = (err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ message: err.message });
  else next(err);
};

exports.handle400 = (err, req, res, next) => {
  const { code } = err;
  const codes = {
    42703: 'bad syntax in post request',
    23505: 'breaking unique limitations',
    23503: 'key is not present in table',
    '42P01': 'missing FROM-clause entry for table',
    '22P02': 'invalid input syntax',
  };
  if (codes.hasOwnProperty(code)) res.status(400).send({ message: codes[code] });
  else next(err);
};

exports.handle405 = (req, res, next) => {
  res.status(405).send({ message: 'invalid http method' });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ message: 'you muppet' });
};
