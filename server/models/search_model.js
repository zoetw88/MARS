const {
  query,
  transaction,
  commit,
  rollback,
} = require('./mysql');

const {
  filterTitle,
  filterCompany,
}=require('./filter_model');

const {recommendCompany} = require('./recommend_model');
const moment = require('moment');
const validator = require('validator');


const getSalary = async (company, title, ip) => {
  try {
    let dataForLineChart;
    if (!validator.isEmpty(company) && !validator.isEmpty(title)) {
      const queryAvgSalary = `
      WITH salary_avg AS (
          SELECT salary,experience,company,MATCH (title) AGAINST (?) as score 
          FROM salary HAVING score > 0.05 order by score DESC
          ) 
      SELECT AVG(salary)as salary ,experience,company
      FROM salary_avg Where company IN (?) GROUP BY experience ,company
      ORDER BY FIELD(company,?)`;

      dataForLineChart = await withTitleCompany(company, title, queryAvgSalary);
    } else if (validator.isEmpty(company)) {
      const queryAvgSalary = `
      WITH company_list AS(
          SELECT salary,experience,company ,MATCH (title) AGAINST (?) AS score 
          FROM salary HAVING score>0.05 ORDER BY score DESC
          )
      SELECT company ,experience ,AVG(salary) AS salary 
      FROM company_list 
      WHERE experience <11
      GROUP BY experience ,company`;

      dataForLineChart = await withTitle(title, queryAvgSalary);
    } else if (validator.isEmpty(title)) {
      const queryAvgSalary = `
      WITH company_list AS(
          SELECT salary,experience,company 
          FROM salary 
          WHERE company IN(?)
          )
      SELECT company ,experience ,AVG(salary) AS salary 
      FROM company_list
      GROUP BY company,experience,company
      ORDER BY FIELD(company,?)`;

      dataForLineChart = await withCompany(company, queryAvgSalary);
    }

    if (dataForLineChart.length==0 && dataForLineChart=='no') {
      return 'no';
    }
    const result = organizeData(dataForLineChart);
    return result;
  } catch (error) {
    return {
      error,
    };
  };
};

const insertRecommendation = async (company, title, ip) => {
  await transaction();
  const time = moment().utc().format('YYYY-MM-DD');
  const companyFiltered = await filterCompany(company);
  if (companyFiltered == 'no') {
    await rollback();
    return error
  };
  const queryRecommend = {
    ip: `${ip}`,
    search_company: `${companyFiltered}`,
    title: `${title}`,
    search_time: `${time}`,
  };
  await query('INSERT INTO recommend SET?', queryRecommend);
  await commit();

};
const getWorkinghour = async (company, title) => {
  try {
    let ScatterChart;
    if (!validator.isEmpty(company) && !validator.isEmpty(title)) {
      const queryWorking = `
      WITH hourlist AS (
          SELECT * ,MATCH (title) AGAINST (?) AS score
          FROM salary HAVING score > 0.05 order by score DESC
          ) 
      SELECT (salary/1000000) AS y,working_hour AS x,company AS label
      FROM hourlist WHERE company IN (?)
      ORDER BY FIELD(company,?)`;

      ScatterChart = await withTitleCompany(company, title, queryWorking);
    } else if (validator.isEmpty(title)) {
      const queryWorking = `
      SELECT (salary/1000000) AS y,working_hour AS x,company AS label
      FROM salary WHERE company IN (?)
      ORDER BY FIELD(company,?)`;

      ScatterChart = await withCompany(company, queryWorking);
    } else if (validator.isEmpty(company)) {
      const queryWorking = `
      WITH hourlist AS (
          SELECT id, 
          (salary/1000000) AS y,
          working_hour AS x,
          company AS label ,
          MATCH (title) AGAINST (?) AS score
          FROM salary HAVING score > 0.05 ORDER BY score DESC
          ) 
      SELECT  y,x,h1.label
      FROM hourlist h1`;

      ScatterChart = await withTitle(title, queryWorking);
    }
    if (ScatterChart.length==0 && ScatterChart=='no') {
      return 'no';
    }
    return ScatterChart;
  } catch (error) {
    return {
      error,
    };
  }
};

const get104jobs = async (company, title) => {
  try {
    let dataForChart;
    if (!validator.isEmpty(company) && !validator.isEmpty(title)) {
      const query104Job = `
      WITH joblist AS (
          SELECT * ,MATCH (title) AGAINST (?) AS score 
          FROM job HAVING score > 0.05 ORDER BY score DESC
          ) 
      SELECT * FROM joblist 
      WHERE company IN (?) 
      ORDER BY FIELD(company,?)`;

      dataForChart = await withTitleCompany(company, title, query104Job);
    } else if (validator.isEmpty(company)) {
      const query104Job = `
      SELECT * ,MATCH (title) AGAINST (?) AS score 
      FROM job HAVING score > 0.6 ORDER BY score DESC`;

      dataForChart = await withTitle(title, query104Job);
    } else if (validator.isEmpty(title)) {
      const query104Job = `
      SELECT * 
      FROM job 
      WHERE company IN(?)
      ORDER BY FIELD(company,?) `;
      dataForChart = await withCompany(company, query104Job);
    }
    if (dataForChart.length==0 && dataForChart=='no') {
      return 'no';
    }
    return dataForChart;
  } catch (error) {
    return {
      error,
    };
  }
};


const extractComments = async (company, title) => {
  try {
    let dataComments;
    if (!validator.isEmpty(company) && !validator.isEmpty(title)) {
      const queryComments = `
      WITH comments_list AS(
          SELECT *,MATCH (title) AGAINST (?) as score 
          FROM comment having score>0.05  order by score DESC
          )
      SELECT *
      FROM comments_list WHERE company IN (?) 
      ORDER BY FIELD(company,?) ,useful DESC;`;
      dataComments = await withTitleCompany(company, title, queryComments);
    } else if (validator.isEmpty(company)) {
      const queryComments = `
      WITH comments_list AS(
          SELECT *,MATCH (title) AGAINST (?) as score 
          FROM comment having score>0.05  order by score DESC
          )
      SELECT *
      FROM comments_list
      ORDER BY useful DESC `;
      dataComments = await withTitle(title, queryComments);
    } else if (validator.isEmpty(title)) {
      const queryComments = `
      SELECT *
      FROM comment WHERE company IN (?) 
      ORDER BY FIELD(company,?),useful DESC`;

      dataComments = await withCompany(company, queryComments);
    }
    if (dataComments.lengt==0 && dataComments=='no') {
      return 'no';
    }
    return dataComments;
  } catch (error) {
    return error;
  }
};
const extractAllComments = async () => {
  try {
    const queryAllComments = `SELECT * FROM comment `;
    const result = await query(queryAllComments);

    if (result.length ==0) {
      return 'no';
    }
    return result;
  } catch (error) {
    return error;
  }
};
const getCounts = async (company) => {
  try {
    if (validator.isEmpty(company)) {
      const cantCounts = [0, 0, 0, 0];
      return cantCounts;
    };

    const companyFiltered = await filterCompany(company);

    const queryCounts = `
      (SELECT COUNT(id) as counts FROM user where company=?)
      UNION ALL
      (SELECT COUNT(id) FROM comment where company=?)     
      UNION ALL
      (SELECT COUNT(id) FROM job where company=?) 
      UNION ALL
      (SELECT COUNT(id) FROM recommend where search_company=?) `;
    const totalCounts = await query(queryCounts, [companyFiltered, companyFiltered, companyFiltered, companyFiltered]);
    const result = [];
    result.push(totalCounts[0].counts, totalCounts[1].counts, totalCounts[2].counts, totalCounts[3].counts);

    if (totalCounts.length ==0) {
      return 'no';
    }
    return result;
  } catch (error) {
    return error;
  }
};

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
  getSalary,
  getWorkinghour,
  get104jobs,
  extractComments,
  extractAllComments,
  getCounts,
  insertRecommendation,

};

