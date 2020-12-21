const router = require('express').Router();
const {
    wrapAsync
} = require('../utils/utils');

const {
    getSalary,
    getWorkingHour,
    getComments,
    getKeywords,
    getJoblist
} = require('../controllers/search_controller');


router.route('/salary')
    .get(wrapAsync(getSalary));

router.route('/workinghour')
    .get(wrapAsync(getWorkingHour));

router.route('/keywords')
    .get(wrapAsync(getKeywords));

router.route('/comments')
    .get(wrapAsync(getComments));

router.route('/joblist')
    .get(wrapAsync(getJoblist));

module.exports = router;