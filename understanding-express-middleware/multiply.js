module.exports = (config) => {
  return (req, res, next) => {
    if (req.body.number === undefined) {
      return next();
    }
    const num = parseFloat(req.body.number);
    if (isNaN(num)) {
      const err = new Error('Submitted value is not a number');
      return next(err);
    }
    const result = num * config.by;
    req.multiplied = result;
    next();
  }
}