// eslint-disable-next-line new-cap
const router = require('express').Router();
const {wrapAsync} = require('../utils/utils');
const {
  signUp,
  signIn,
  verifyToken,
} = require('../controllers/user_controller');

router.route('/user/signup')
    .post(wrapAsync(signUp));

router.route('/user/signin')
    .post(wrapAsync(signIn));

router.route('/user/logout')
    .get(wrapAsync(verifyToken));

module.exports = router;
