const {
    salary,
    working_hour,
} = require('../models/search_model');
const {
    extract_comments 
    } = require('../models/comment_model');
    
const path=require('path')
const fs = require('fs');

const getSalary = async (req, res) => {
    try {
        let {
            company,
            title
        } = req.query
        console.log('result')
        // let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        // if (ip.substr(0, 7) == "::ffff:") {
        //     ip = ip.substr(7)
        // }
        // let company=window.localStorage.getItem('company', company)
        // let title=window.localStorage.getItem('title', title)
        let result = await extract_comments(company, title)
        console.log('result')
        res.status(200).send(result)
    } catch (e) {
        console.log('Catch an error: ', e)
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
        let result = await salary(company, title, ip)
        let salary_path=path.join(__dirname, '../../public/json/salary.json')
        let sendJSON = await JSON.stringify(result)
        await fs.writeFile(salary_path,sendJSON,function(err, result) {
            if(err) console.log('error', err);
          })
          res.status(200).send('ok')
    } catch (e) {
        console.log('Catch an error: ', e)
    }
}
   
const getComments = async (req, res) => {
    try {
        let {
            company,
            title
        } = req.query
        console.log(req.query)
        // let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
        // if (ip.substr(0, 7) == "::ffff:") {
        //     ip = ip.substr(7)
        // }

        let result = await extract_comments(company, title)
        console.log(result)
        res.status(200).send(result)
    } catch (e) {
        console.log('Catch an error: ', e)
    }


}

module.exports = {
    getSalary,
    getWorkingHour,
    getComments 

};