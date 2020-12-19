const router = require('express').Router();
const {wrapAsync} = require('../utils/utils');

const {
    getSalary,
    getWorkingHour,
    getComments
} = require('../controllers/search_controller');


router.route('/salary')
    .get(wrapAsync(getSalary));

router.route('/workinghour')
    .get(wrapAsync(getWorkingHour));

router.route('/comments')
    .get(wrapAsync(getComments));

module.exports = router;