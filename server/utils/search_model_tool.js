const {
  fp_alogrithm,
  filterTitle,
  filterCompany,
} = require('../models/filter_model');
/**
 * chart呈現格式需求
 * @param {array} salaryResult
 * @return {array} avgSalaryResult
 */
function transInt(salaryResult) {
  const avgSalaryResult = [null, null, null, null, null, null, null, null, null, null];
  if (salaryResult.length > 0) {
    for (let i = 0; i < salaryResult.length; i++) {
      if (salaryResult[i].experience < 11) {
        const order = parseInt(salaryResult[i].experience);
        avgSalaryResult[order] = parseInt(salaryResult[i].salary);
      };
    };
  };
  return avgSalaryResult;
};

/**
 * chart呈現格式需求
 * @param {array} salaryResult
 * @return {array} salary with compared company
 */
function organizeData(salaryResult) {
  if (salaryResult.length > 0) {
    const data = [];
    const company = salaryResult.map((data) => data.company);
    const companylist = Array.from(new Set(company));
    companylist.map((company) => {
      const singleCompany = salaryResult
          .filter((x) => x.company == company);

      data.push(singleCompany);
    });
    return data;
  }
}
/**
 * chart呈現需求-
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

const withTitleAndCompany = async (title, company, query) => {
  const titleFiltered = await filterTitle(title);
  const companyFiltered = await filterCompany(company);
  if (companyFiltered == 'no') {
    return 'no';
  }
  const companylist = await fp_alogrithm(companyFiltered);
  let companyCombination = [];
  companyCombination = companyCombination.concat(companyFiltered, companylist[0], companylist[1]);
  const salaryResult = await query(query, [titleFiltered, companyCombination]);
  if (salaryResult.length > 0) {
    const salaryData = organizeData(salaryResult);
    const dataForChart = combineData(salaryData);
    return dataForChart;
  } else {
    return 'no';
  }
};

const withTitle = async (title, query) => {
  const titleFiltered = await filterTitle(title);
  const salaryResult = await query(query, [titleFiltered]);
  if (salaryResult.length > 0) {
    const titleResult = organizeData(salaryResult);
    const resultForChart = combineData(titleResult);
    return resultForChart;
  } else {
    return 'no';
  }
};

const withCompany = async ( company, query) => {
  const companyFiltered = await filterCompany(company);
  if (companyFiltered=='no') {
    return 'no';
  }
  const companylist = await fp_alogrithm(companyFiltered);
  let companyCombination = [];
  companyCombination = companyCombination.concat(companyFiltered, companylist[0], companylist[1]);
  const salaryResult = await query(query, [companyCombination]);
  if ( salaryResult.length > 0) {
    const salaryData = organizeData(salaryResult);
    const dataForChart = combineData(salaryData);


    return dataForChart;
  } else {
    return 'no';
  }
};
module.exports = {
  withTitleAndCompany,
  withTitle,
  withCompany,
};
