const router = require('express').Router();
const {wrapAsync} = require('../utils/utils');

const {
    getSalary,
    getWorkingHour
} = require('../controllers/search_controller');


router.route('/salary')
    .get(wrapAsync(getSalary));


router.route('/workinghour')
    .get(wrapAsync(getWorkingHour));

module.exports = router;