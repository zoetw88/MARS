const search = require('../models/search_model');
const {
  searchKeywords,
} = require('../algorithm/ti_idf/ti_idf');
const path = require('path');
const fs = require('fs');
const validator = require('validator');

const getSalary = async (req, res) => {
  try {
    const {title, company} = req.query;
    let ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    ip.substr(0, 7) == '::ffff:' ? (ip = ip.substr(7)) : '';
    const result = await search.getSalary(company, title, ip);
    const salaryChartPath = path.join(__dirname, '../../public/json/salary.json');
    const resultJSON = JSON.stringify(result);
    fs.writeFile(salaryChartPath, resultJSON, function(err, result) {
      if (err) console.log('error', err);
    });

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
    let ip = req.headers['x-real-ip'] || req.connection.remoteAddress;
    ip.substr(0, 7) == '::ffff:' ? (ip = ip.substr(7)) : '';
    const result = await search.getWorkinghour(company, title, ip);
    const workChartPath = path.join(__dirname, '../../public/json/company.json');
    const resultJSON = JSON.stringify(result);
    fs.writeFile(workChartPath, resultJSON, function(err, result) {
      if (err) console.log('error', err);
    });
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
    if (!validator.isEmpty(company)) {
      const result = await searchKeywords(company, title);
      res.status(200).send(result);
    } else {
      return 'no';
    }
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
    const result = await search.getCompanylist();
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
    const result = await search.getJobslist();
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
    await search.saveLike(number);
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
