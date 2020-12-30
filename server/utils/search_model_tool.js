const {
  recommendCompany,
  filterTitle,
  filterCompany,
} = require('../models/filter_model');

const {
  query,
} = require('../models/mysql');

/**
 * organize salary result for chart format
 * @param {array} salaryResult
 * @return {array} avgSalaryResult
 */
function transInt(salaryResult) {
  // eslint-disable-next-line max-len
  const avgSalaryResult = [null, null, null, null, null, null, null, null, null, null];
  salaryResult.map((company)=>{
    const order=parseInt(company.experience);
    avgSalaryResult[order]=parseInt(company.salary);
  });
  return avgSalaryResult;
};

/**
 * organize salary result for chart format
 * @param {array} salaryResult
 * @return {array}  categorized salary result
 */
function organizeData(salaryResult) {
  const result = [];
  const company = salaryResult.map((data) => data.company);
  const companys = Array.from(new Set(company));
  companys.map((company) => {
    const singleCompany = salaryResult
        .filter((x) => x.company == company);
    result.push(singleCompany);
  });
  return result;
}
/**
 *organize salary result for chart format
 * @param {array} salaryData
 * @return {array} data
 */
function combineData(salaryData) {
  const data = [];
  for (i = 0; i < salaryData.length; i++) {
    const dataForChart = {};
    dataForChart['y'] = transInt(salaryData[i]);
    dataForChart['name'] = salaryData[i][0].company;
    dataForChart['x'] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    data.push(dataForChart);
  }
  return data;
}
/**
 *
 * @param {string} title
 * @param {string} company
 * @param {string} queryAvgSalary
 * @return {object} dataForChart
 */

const withTitleCompany = async (company, title, querystr) => {
  const titleFiltered = await filterTitle(title);
  const companyFiltered = await filterCompany(company);
  if (companyFiltered == 'no') {
    return 'no';
  }
  const recommendation = await recommendCompany(companyFiltered, titleFiltered);
  const companylist = [];
  companylist.push(companyFiltered, recommendation[0], recommendation[1]);
  const result = await query(querystr, [titleFiltered, companylist]);
  return result;
};

const withTitle = async (title, querystr) => {
  const titleFiltered = await filterTitle(title);
  const result = await query(querystr, [titleFiltered]);
  return result;
};

const withCompany = async (company, querystr) => {
  const companyFiltered = await filterCompany(company);
  if (companyFiltered == 'no') {
    return 'no';
  }
  const recommendation = await recommendCompany(companyFiltered, null);
  const companylist = [];
  companylist.push(companyFiltered, recommendation[0], recommendation[1]);
  const result = await query(querystr, [companylist]);
  return result;
};

const makesalaryLineChart = async (dataForChart) => {
  const dataOrganized = organizeData(dataForChart);
  const result = combineData(dataOrganized);
  return result;
};
module.exports = {
  withTitleCompany,
  withTitle,
  withCompany,
  makesalaryLineChart,
};
