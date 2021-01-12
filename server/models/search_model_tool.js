

const {
  recommendCompany,
  filterTitle,
  filterCompany,
} = require('./filter_model');

const {
  query,
} = require('./mysql');


/**
 *for three type search request:
 *1.have title and company 2.only have title 3.only have company
 * @param {string} title
 * @param {string} company
 * @param {string} querystr
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
  const mainResult=await query(querystr, [titleFiltered, companyFiltered, companyFiltered]);
  if (mainResult.length ==0) {
    return 'no';
  }
  companylist.push(companyFiltered, recommendation[0], recommendation[1]);
  const result = await query(querystr, [titleFiltered, companylist, companylist]);
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
  const mainResult=await query(querystr, [companyFiltered, companyFiltered]);
  if (mainResult.length==0) {
    return 'no';
  }
  const recommendation = await recommendCompany(companyFiltered, null);
  const companylist = [];
  companylist.push(companyFiltered, recommendation[0], recommendation[1]);
  const result = await query(querystr, [companylist, companylist]);
  return result;
};

/**
 * reformat salary result for chart format
 * @param {array} salaryResult
 * @return {array} avgSalaryResult
 */
function transInt(salaryResult) {
  const avgSalaryResult = [null, null, null, null, null, null, null, null, null, null];
  salaryResult.map((company)=>{
    const order=parseInt(company.experience);
    avgSalaryResult[order]=parseInt(company.salary);
  });
  return avgSalaryResult;
};

/**
 * organize salary result for chart format
 * @param {array} salaryResult;
 * @return {array}  data fitted for chart ;
 */
function organizeData(salaryResult) {
  const salaryData = [];
  const result=[];
  const company = salaryResult.map((data) => data.company);
  const companys = Array.from(new Set(company));
  companys.map((company) => {
    const singleCompany = salaryResult
        .filter((x) => x.company == company);
    salaryData.push(singleCompany);
  });
  salaryData.map((data)=>{
    const dataForChart = {};
    dataForChart['y'] = transInt(data);
    dataForChart['name'] = data[0].company;
    dataForChart['x'] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    result.push(dataForChart);
  });
  return result;
};

module.exports = {
  withTitleCompany,
  withTitle,
  withCompany,
  organizeData,
};
