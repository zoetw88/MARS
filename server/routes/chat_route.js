// eslint-disable-next-line new-cap
const router = require('express').Router();
const {
  wrapAsync,
} = require('../utils/utils');
const {
  editor,
  verifyToken,
  askQuestion,
} = require('../controllers/chat_controller');


router.route('/chat').get(wrapAsync(verifyToken));

router.route('/editor').get(wrapAsync(editor));

router.route('/question').post(wrapAsync(askQuestion));

module.exports = router;
