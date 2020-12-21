const {
    salary,
    working_hour,
    joblist
} = require('../models/search_model');
const {
    extract_comments 
    } = require('../models/comment_model');
const {
       keyword
    } = require('../models/show_keyword_model');   
const path=require('path')
const fs = require('fs');

const getSalary = async (req, res) => {
    try {
        let {title} = req.query
        let {company} = req.query
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7)
        }
        let result = await salary(company, title, ip)
        let salary_path=path.join(__dirname, '../../public/json/salary.json')
        let sendJSON = await JSON.stringify(result)
        await fs.writeFile(salary_path,sendJSON,function(err, result) {
            if(err) console.log('error', err);
          })

        res.status(200).send(result)

    } catch (error) {
        return {error};
    }



}

const getWorkingHour = async (req, res) => {
    try {
        let {title} = req.query
        let {company} = req.query
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7)
        }
        let result = await working_hour(company, title, ip)
        let salary_path=path.join(__dirname, '../../public/json/company.json')
        let sendJSON = await JSON.stringify(result)
        await fs.writeFile(salary_path,sendJSON,function(err, result) {
            if(err) console.log('error', err);
          })

          res.status(200).send(result)

        } catch (error) {
            return {error};
        }
    
}
   
const getComments = async (req, res) => {
    try {
        let {
            company,
            title
        } = req.query
       
        // let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        // if (ip.substr(0, 7) == "::ffff:") {
        //     ip = ip.substr(7)
        // }

        let result = await extract_comments(company, title)

        res.status(200).send(result)
        
    } catch (error) {
        return {error};
    }
}
   
const getKeywords = async (req, res) => {
    try {
        let {
            company,
            title
        } = req.query
        let result=await keyword(company,title)
    
        // let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        // if (ip.substr(0, 7) == "::ffff:") {
        //     ip = ip.substr(7)
        // }
        res.status(200).send(result)
        
    } catch (error) {
        return {error};
    }
}
   
const getJoblist = async (req, res) => {
    try {
        let {
            company,
            title
        } = req.query
        let result=await joblist(company,title)
        
        // let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        // if (ip.substr(0, 7) == "::ffff:") {
        //     ip = ip.substr(7)
        // }
        res.status(200).send(result)
        
    } catch (error) {
        return {error};
    }
}
module.exports = {
    getSalary,
    getWorkingHour,
    getComments,
    getKeywords,
    getJoblist

};