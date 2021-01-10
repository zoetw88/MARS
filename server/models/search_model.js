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
  organizeData,
} = require('./search_model_tool');

const moment = require('moment');
const validator = require('validator');

const insertRecommendation = async (company, title, ip) => {
  await transaction();
  const time = moment().utc().format('YYYY-MM-DD');
  const companyFiltered = await filterCompany(company);
  if (companyFiltered != 'no') {
    const queryRecommend = {
      ip: `${ip}`,
      search_company: `${companyFiltered}`,
      title: `${title}`,
      search_time: `${time}`,
    };
    await query('INSERT INTO recommend SET?', queryRecommend);
    await commit();
  } else {
    await rollback();
    return error;
  }
};

const getSalary = async (company, title, ip) => {
  try {
    insertRecommendation(company, title, ip);
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
     
     console.log(dataForLineChart)
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

    if(dataForLineChart.length>0){
      const result = organizeData(dataForLineChart);
      return result;
    }else{
      return 'no'
    }

  } catch (error) {
    return {
      error
    };
  };
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
    if(ScatterChart.length>0){
     
      return ScatterChart;
    }else{
      return 'no'
    }

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
    if(dataForChart.length>0){
      return dataForChart;
    }else{
      return 'no'
    }
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
    if(dataComments.length>0){
     
      return dataComments;
    }else{
      return 'no'
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
const getCompanylist = async () => {
  try {
    const queryCompany = `SELECT DISTINCT company FROM salary`;
    const companylist = await query(queryCompany);

    if (companylist.length > 0) {
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

const getJobslist = async () => {
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
const saveLike = async (id) => {
  try {
    const querylike = `
    UPDATE comment
    SET useful = useful + 1
    WHERE id = ?`;
   await query(querylike,id);
    
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
  saveLike
};
