const {
  query,
} = require('./mysql');

const getCompanylist = async () => {
  try {
    const queryCompany = `SELECT DISTINCT company FROM salary`;
    const companylist = await query(queryCompany);

    if (companylist.length == 0) {
      return 'no';
    }
    return companylist;
  } catch (error) {
    return error;
  }
};

const getJobslist = async () => {
  try {
    const queryJob = `SELECT DISTINCT title FROM salary`;
    const joblist = await query(queryJob);
    if (joblist.length ==0) {
        return 'no';
      }
      return joblist;
  } catch (error) {
    return error;
  }
};
const saveLike = async (id) => {
  try {
    const querylike = `
      UPDATE comment
      SET useful = useful + 1
      WHERE id = ?`;
    await query(querylike, id);
  } catch (error) {
    return error;
  }
};


module.exports = {
  getCompanylist,
  getJobslist,
  saveLike,
};

