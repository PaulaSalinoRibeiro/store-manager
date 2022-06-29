const erroMiddleware = (err, _req, res, _next) => {
  res.status(err.code).json(err.message);
};

module.exports = erroMiddleware;