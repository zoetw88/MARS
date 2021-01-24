// eslint-disable-next-line new-cap
const router = require('express').Router();
const {
  wrapAsync,
} = require('../utils/utils');
const {
  editor,
  askQuestion,
  verifyIdentity,
} = require('../controllers/chatroom_controller');


router.route('/chat')
    .get(wrapAsync(verifyIdentity));

router.route('/editor')
    .get(wrapAsync(editor));

router.route('/question')
    .post(wrapAsync(askQuestion));

module.exports = router;
