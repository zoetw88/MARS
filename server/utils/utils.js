
// reference: https://thecodebarbarian.com/80-20-guide-to-express-error-handling
const wrapAsync = (fn) => {
  return function(req, res, next) {
    // Make sure to `.catch()` any errors and pass them along to the `next()`
    // middleware in the chain, in this case the error handler.
    fn(req, res, next).catch(next);
  };
};
const isWord=(word) => {
  const check = /^([a-zA-Z\u4e00-\u9fa5]+)$/;
  return (check.test(word));
};
const getKeyByValue = (object, value) => {
  return Object.keys(object).find((key) => object[key] === value);
};
module.exports = {
  wrapAsync,
  getKeyByValue,
  isWord,
};
