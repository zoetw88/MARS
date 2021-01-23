const search = require('../models/search_model');
const {searchKeywords} = require('../algorithm/ti_idf/ti_idf');
const path = require('path');
const fs = require('fs');
const assist = require('../models/assistance_model');


const getSalary = async (req, res) => {
  try {
    const {title, company} = req.query;
    const {headers, connection}=req;
    
    insertRecommendation(company, title, headers, connection);
    const result = await search.getSalary(company, title);
    writeToJSON('salary', result);
    res.status(200).send(result);
  } catch (error) {
    return {
      error,
    };
  }
};
const getWorkingHours = async (req, res) => {
  try {
    const {title, company} = req.query;
    const result = await search.getWorkinghour(company, title);
    writeToJSON('company', result);

    res.status(200).send(result);
  } catch (error) {
    return {
      error,
    };
  }
};


const getComments = async (req, res) => {
  try {
    const {company, title} = req.query;
    const result = await search.extractComments(company, title);

    res.status(200).send(result);
  } catch (error) {
    return {
      error,
    };
  }
};

const getKeywords = async (req, res) => {
  try {
    const {company, title} = req.query;
    const result = await searchKeywords(company, title);
    res.status(200).send(result);
  } catch (error) {
    return {
      error,
    };
  }
};

const getJob104list = async (req, res) => {
  try {
    const {company, title} = req.query;
    const result = await search.get104jobs(company, title);

    res.status(200).send(result);
  } catch (error) {
    return {
      error,
    };
  }
};

const getCompanylist = async (req, res) => {
  try {
    const result = await assist.getCompanylist();
    const companylist = Object.values(result).map((item) => item.company);

    res.status(200).send(companylist);
  } catch (error) {
    return {
      error,
    };
  }
};

const getJoblist = async (req, res) => {
  try {
    let joblist = [];
    const result = await assist.getJobslist();
    Object.values(result).map((item) => {
      const job = item.title.split(' ');
      joblist.push(job[0]);
    });
    joblist = Array.from(new Set(joblist));

    res.status(200).send(joblist);
  } catch (error) {
    return {
      error,
    };
  }
};


const saveCommentLike = async (req, res) => {
  try {
    const {id} = req.body;
    const number = parseInt(id);
    await assist.saveLike(number);
  } catch (error) {
    return {
      error,
    };
  }
};


const getCounts = async (req, res) => {
  try {
    const {company} = req.query;
    const result = await search.getCounts(company);

    res.status(200).send(result);
  } catch (error) {
    return {
      error,
    };
  }
};


const insertRecommendation = async (company, title, headers, connection)=>{
  let ip = headers['x-real-ip'] || connection.remoteAddress;
  ip.substr(0, 7) == '::ffff:' ? (ip = ip.substr(7)) : '';
  await search.insertRecommendation(company, title, ip);
};

const writeToJSON = async (filename, result)=>{
  const chartPath = path.join(__dirname, `../../public/json/${filename}.json`);
  const resultJSON = JSON.stringify(result);
  fs.writeFile(chartPath, resultJSON, function(err, result) {
    if (err) throw err; 
  });
};
module.exports = {
  getSalary,
  getWorkingHours,
  getComments,
  getKeywords,
  getJob104list,
  getCompanylist,
  getJoblist,
  saveCommentLike,
  getCounts,
};
