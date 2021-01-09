// eslint-disable-next-line new-cap
const router = require('express').Router();
const {
  wrapAsync,
} = require('../utils/utils');
const {
  editor,
  askQuestion,
} = require('../controllers/chatroom_controller');

const {
  verifyToken,
} = require('../controllers/user_controller');

router.route('/chat').get(wrapAsync(verifyToken));

router.route('/editor').get(wrapAsync(editor));

router.route('/question').post(wrapAsync(askQuestion));

module.exports = router;
