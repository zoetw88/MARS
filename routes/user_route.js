const router = require('express').Router();
const {wrapAsync} = require('../utils/utils');

const {
    signUp,
    signIn,
    getUserProfile,
    verifyToken
} = require('../controllers/user_controller');

router.route('/user/signup')
    .post(wrapAsync(signUp));

router.route('/user/signin')
    .post(wrapAsync(signIn));

router.route('/member')
    .get(verifyToken,wrapAsync(getUserProfile));


module.exports = router;