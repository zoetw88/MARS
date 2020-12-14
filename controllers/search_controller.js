const {
    salary,
    working_hour,
    test
} = require('../models/search_model');
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
        console.log(result)
        let salary_path=path.join(__dirname, '../public/json/salary.json')
        let sendJSON = await JSON.stringify(result)
        await fs.writeFile(salary_path,sendJSON,function(err, result) {
            if(err) console.log('error', err);
           console.log('salary')
          });
          
          res.status(200).send('ok')
    } catch (e) {
        console.log('Catch an error: ', e)
    }


}



const getWorkingHour = async (req, res) => {
    try {
        let {
            company
        } = req.query;
        let {
            title
        } = req.query;
        let result = await working_hour(company,title)
        let sendJSON =await JSON.stringify(result)
        let company_path=path.join(__dirname, '../public/json/company.json')
        await fs.writeFile(company_path,sendJSON,function(err, result) {
            if(err) console.log('error', err);
            console.log('company');
          });
          res.status(200).send('ok')
    } catch (e) {
        console.log('Catch an error: ', e)
    }


}
module.exports = {
    getSalary,
    getWorkingHour
};