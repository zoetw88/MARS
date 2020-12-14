const router = require('express').Router();
const {wrapAsync} = require('../utils/utils');

const {
    signUp,
    signIn,
    getUserProfile,
    verifyToken,
    logout
} = require('../controllers/user_controller');

router.route('/user/signup')
    .post(wrapAsync(signUp));

router.route('/user/signin')
    .post(wrapAsync(signIn));

router.route('/user/logout')
    .get(wrapAsync(logout));

router.route('/member')
    .get(verifyToken,wrapAsync(getUserProfile));

router.route('/contact')
    .get(verifyToken,wrapAsync(getUserProfile));
module.exports = router;