const router = require('express').Router();
const {
  wrapAsync,
} = require('../utils/utils');

const {
  getSalary,
  getWorkingHours,
  getComments,
  getKeywords,
  getJoblist,
  getCompanylist,
  getJob104list,
  saveCommentLike,
} = require('../controllers/search_controller');


router.route('/salary')
    .get(wrapAsync(getSalary));

router.route('/workinghour')
    .get(wrapAsync(getWorkingHours));

router.route('/keywords')
    .get(wrapAsync(getKeywords));

router.route('/comments')
    .get(wrapAsync(getComments));

router.route('/job104list')
    .get(wrapAsync(getJob104list));

router.route('/companylist')
    .get(wrapAsync(getCompanylist));

router.route('/joblist')
    .get(wrapAsync(getJoblist));

router.route('/like')
    .post(wrapAsync(saveCommentLike));

module.exports = router;
