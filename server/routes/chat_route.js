const router = require('express').Router();
const {
    wrapAsync
} = require('../utils/utils');


const {
    editor,
    verifyToken
} = require('../controllers/chat_controller');

router.route('/chat').get(wrapAsync(verifyToken));


router.route('/editor').get(wrapAsync(editor));

module.exports = router;