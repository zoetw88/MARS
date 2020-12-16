const router = require('express').Router();
const {wrapAsync} = require('../utils/utils');

const {
    verifyToken
} = require('../controllers/user_controller');

const {
    editor
} = require('../controllers/chat_controller');

router.route('/chat')
    .get(wrapAsync(verifyToken));
    
router.route('/test')
    .get(wrapAsync(editor));
        
module.exports = router;