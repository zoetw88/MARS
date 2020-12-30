const {
  query,
  transaction,
  commit,
  rollback,
} = require('./mysql');

const {
  filterCompany,
} = require('./filter_model');

const {
  withTitleCompany,
  withTitle,
  withCompany,
  makesalaryLineChart,
} = require('../utils/search_model_tool');

const moment = require('moment');
const validator = require('validator');

const insertRecommendation= async (company, title, ip)=>{
  await transaction();
  const time = moment().format('YYYY-MM-DD');
  const companyFiltered = await filterCompany(company);
  if (companyFiltered != 'no') {
    const queryRecommend = {
      ip: `${ip}`,
      search_company: `${companyFiltered}`,
      title: `${title}`,
      time: `${time}`,
    };
    const result = await query('INSERT INTO recommend SET?', queryRecommend);
    if (result.length > 0) {
      await commit();
    } else {
      await rollback();
    }
  }
};

const getSalary = async (company, title, ip) => {
  try {
    insertRecommendation(company, title, ip);

    if (!validator.isEmpty(company) && !validator.isEmpty(title)) {
      const queryAvgSalary = `
      WITH salary_avg AS (
          SELECT salary,experience,company,MATCH (title) AGAINST (?) as score 
          FROM salary HAVING score > 0.05 order by score DESC
          ) 
          SELECT AVG(salary)as salary ,experience,company
          FROM salary_avg Where company IN (?) GROUP BY experience `;

      const dataForLineChart= await withTitleCompany(company, title, queryAvgSalary);
      const result=makesalaryLineChart(dataForLineChart);
      return result;
    } else if (validator.isEmpty(company)) {
      const queryAvgSalary = `
      with company_list as(
          SELECT salary,experience,company ,MATCH (title) AGAINST (?) as score 
          FROM salary having score>0.05  order by score DESC
          )
          SELECT company ,experience ,AVG(salary)as salary 
          FROM company_list 
          WHERE experience <11
          GROUP BY experience`;

      const dataForLineChart=await withTitle(title, queryAvgSalary);
      const result=makesalaryLineChart(dataForLineChart);
      return result;
    } else if (validator.isEmpty(title)) {
      const queryAvgSalary = `
      with company_list as(
          SELECT salary,experience,company 
          FROM salary 
          WHERE company IN(?)
          )
          SELECT company ,experience ,AVG(salary)as salary 
          FROM company_list
          GROUP BY company,experience`;

      const dataForLineChart=await withCompany(company, queryAvgSalary);
      const result=makesalaryLineChart(dataForLineChart);
      return result;
    }
  } catch (error) {
    return {
      error,
    };
  };
};

const getWorkinghour = async (company, title) => {
  try {
    if (!validator.isEmpty(company) && !validator.isEmpty(title)) {
      const queryWorking = `
            WITH hourlist AS (
                SELECT * ,MATCH (title) AGAINST (?) AS score
                FROM salary HAVING score > 0.05 order by score DESC
                    ) 
                SELECT (salary/1000000) AS y,working_hour AS x,company AS label
                FROM hourlist WHERE company IN (?)`;

      const ScatterChart =await withTitleCompany(company, title, queryWorking);

      return ScatterChart;
    } else if (validator.isEmpty(title)) {
      const queryWorking = `
            SELECT (salary/1000000) AS y,working_hour AS x,company AS label
            FROM salary WHERE company IN (?)`;

      const ScatterChart =await withCompany(company, queryWorking);

      return ScatterChart;
    } else if (validator.isEmpty(company)) {
      const queryWorking = `
            WITH hourlist AS (
                SELECT id, 
                  (salary/1000000) AS y,
                  working_hour AS x,
                  company AS label ,
                  MATCH (title) AGAINST (?) AS score
                FROM salary HAVING score > 0.05 order by score DESC
                   ) 
                SELECT  y,x,h1.label
                FROM hourlist h1`;

      const ScatterChart =await withTitle(title, queryWorking);

      return ScatterChart;
    }
  } catch (error) {
    return {
      error,
    };
  }
};

const get104jobs = async (company, title) => {
  try {
    if (!validator.isEmpty(company) && !validator.isEmpty(title)) {
      const query104Job = `
            WITH joblist AS (
            SELECT * ,MATCH (title) AGAINST (?) AS score 
            FROM job HAVING score > 0.05 order by score DESC
                ) 
            SELECT * FROM joblist 
            WHERE company IN (?) `;

      const dataForChart =await withTitleCompany(company, title, query104Job);

      return dataForChart;
    } else if (validator.isEmpty(company)) {
      const query104Job = `
            SELECT * ,MATCH (title) AGAINST (?) AS score 
            FROM job HAVING score > 0.6 ORDER BY score DESC`;

      const dataForChart=await withTitle(title, query104Job);

      return dataForChart;
    } else if (validator.isEmpty(title)) {
      const query104Job = `
            SELECT * 
            FROM job 
            WHERE company IN(?) `;
      const dataForChart=await withCompany(company, query104Job);

      return dataForChart;
    }
  } catch (error) {
    return {
      error,
    };
  }
};


const extractComments = async (company, title) => {
  try {
    if (!validator.isEmpty(company) && !validator.isEmpty(title)) {
      const queryComments = `
            with comments_list as(
                SELECT *,MATCH (title) AGAINST (?) as score 
                FROM comment having score>0.05  order by score DESC
                )
                SELECT *
                FROM comments_list WHERE company IN (?) 
                ORDER BY useful DESC`;
      const dataComments =await withTitleCompany(company, title, queryComments);

      return dataComments;
    } else if (validator.isEmpty(company)) {
      const queryComments = `
            with comments_list as(
                SELECT *,MATCH (title) AGAINST (?) as score 
                FROM comment having score>0.05  order by score DESC
                )
                SELECT *
                FROM comments_list 
                ORDER BY useful DESC`;
      const dataComments = await withTitle(title, queryComments);

      return dataComments;
    } else if (validator.isEmpty(title)) {
      const queryComments = `
                SELECT *
                FROM comment WHERE company IN (?) 
                ORDER BY useful DESC`;

      const dataComments = await withCompany(company, queryComments);

      return dataComments;
    }
  } catch (error) {
    await rollback();
    return error;
  }
};

const extractAllComments = async () => {
  try {
    const queryAllComments = `SELECT * FROM comment `;
    const result = await query(queryAllComments);

    if (result.length > 0) {
      return result;
    } else {
      return 'no';
    }
  } catch (error) {
    return error;
  }
};
const getCompanylist=async ()=>{
  try {
    const queryCompany = `SELECT DISTINCT company FROM salary`;
    const companylist= await query(queryCompany);

    if ( companylist.length > 0) {
      return companylist;
    } else {
      return 'no';
    }
  } catch (error) {
    return {
      error,
    };
  }
};

const getJobslist=async ()=>{
  try {
    const queryJob = `SELECT DISTINCT title FROM salary`;
    const joblist = await query(queryJob);

    if (joblist.length > 0) {
      return joblist;
    } else {
      return 'no';
    }
  } catch (error) {
    return {
      error,
    };
  }
};

module.exports = {
  getSalary,
  getWorkinghour,
  get104jobs,
  getCompanylist,
  getJobslist,
  extractComments,
  extractAllComments,
};
