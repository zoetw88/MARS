const search = require('../models/search_model');
const {searchKeywords} = require('../models/show_keyword_model');
const path=require('path');
const fs = require('fs');


const getSalary = async (req, res) => {
  try {
    const {title} = req.query;
    const {company} = req.query;
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip.substr(0, 7) == '::ffff:') {
      ip = ip.substr(7);
    }
    const result = await search.getSalary(company, title, ip);
    const salaryChartPath=path.join(__dirname, '../../public/json/salary.json');
    const sendJSON = JSON.stringify(result);
    fs.writeFile(salaryChartPath, sendJSON, function(err, result) {
      if (err) console.log('error', err);
    });

    res.status(200).send(result);
  } catch (error) {
    return {error};
  }
};

const getWorkingHours = async (req, res) => {
  try {
    const {title} = req.query;
    const {company} = req.query;
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (ip.substr(0, 7) == '::ffff:') {
      ip = ip.substr(7);
    }
    const result = await search.getWorkinghour(company, title, ip);
    const workChartPath=path.join(__dirname, '../../public/json/company.json');
    const sendJSON =JSON.stringify(result);
    fs.writeFile(workChartPath, sendJSON, function(err, result) {
      if (err) console.log('error', err);
    });

    res.status(200).send(result);
  } catch (error) {
    return {error};
  }
};

const getComments = async (req, res) => {
  try {
    const {
      company,
      title,
    } = req.query;
    const result = await search.extractComments(company, title);
    res.status(200).send(result);
  } catch (error) {
    return {error};
  }
};

const getKeywords = async (req, res) => {
  try {
    const {
      company,
      title,
    } = req.query;
    const result=await searchKeywords(company, title);
    res.status(200).send(result);
  } catch (error) {
    return {error};
  }
};

const getJob104list = async (req, res) => {
  try {
    const {
      company,
      title,
    } = req.query;
    const result=await search.get104jobs(company, title);
    res.status(200).send(result);
  } catch (error) {
    return {error};
  }
};

const getCompanylist = async (req, res) => {
  try {
    const result=await search.getCompanylist();
    res.status(200).send(result);
  } catch (error) {
    return {error};
  }
};


const getJoblist = async (req, res) => {
  try {
    const result=await search.getJobslist();
    res.status(200).send(result);
  } catch (error) {
    return {error};
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
};
