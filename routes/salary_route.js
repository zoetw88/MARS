const router = require('express').Router();
const {wrapAsync} = require('../utils/utils');

const {
    getSalary
} = require('../controllers/salary_controller');


router.route('/salary')
    .get(wrapAsync(getSalary));


module.exports = router;