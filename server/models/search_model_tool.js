

const {
  recommendCompany,
  filterTitle,
  filterCompany,
} = require('./filter_model');

const {
  query,
} = require('./mysql');


const withTitleCompany = async (company, title, querystr) => {
  const titleFiltered = await filterTitle(title);
  const companyFiltered = await filterCompany(company);
  if (companyFiltered == 'no'||titleFiltered=='no') {
    return 'no';
  }

  const recommendation = await recommendCompany(companyFiltered, titleFiltered);
  const companylist = [];
  const mainCompanyResult=await query(querystr, [titleFiltered, companyFiltered, companyFiltered]);
  if (mainCompanyResult.length ==0) {
    return 'no';
  }

  companylist.push(companyFiltered, recommendation[0], recommendation[1]);
  const result = await query(querystr, [titleFiltered, companylist, companylist]);
  return result;
};

const withTitle = async (title, querystr) => {
  const titleFiltered = await filterTitle(title);
  if (titleFiltered=='no') {
    return 'no';
  }
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


function transInt(salaryResult) {
  const avgSalaryResult = [null, null, null, null, null, null, null, null, null, null];

  salaryResult.map((company)=>{
    const order=parseInt(company.experience);
    avgSalaryResult[order]=parseInt(company.salary);
  });
  return avgSalaryResult;
};


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
