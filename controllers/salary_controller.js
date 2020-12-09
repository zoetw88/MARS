const {
    salary,
    working_hour,
    test
} = require('../models/salary_model');

const fs = require('fs');
const getSalary = async (req, res) => {
    try {
        let company= req.query.company;
        let ip=req.ip
        let title=req.query.title
        let result = await salary(company,title)
        let sendJSON =await JSON.stringify(result)
         console.log(result)
      
        await fs.writeFile('C:/Users/zoetw/Documents/GitHub/WenChang/public/json/chart2.json',sendJSON,function(err, result) {
            if(err) console.log('error', err);
            console.log('done');
          });
        res.status(200).send(result)
    } catch (e) {
        console.log('Catch an error: ', e)
    }


}



const getWorkingHour = async (req, res) => {
    try {
        let {
            company
        } = req.query;
      

        let result = await working_hour(company)
        let sendJSON =await JSON.stringify(result)
        console.log(result)
        await fs.writeFile('C:/Users/zoetw/Documents/GitHub/WenChang/public/json/chart.json',sendJSON,function(err, result) {
            if(err) console.log('error', err);
            console.log('complete');
          });
       
        res.status(200).send(result)
    } catch (e) {
        console.log('Catch an error: ', e)
    }


}
module.exports = {
    getSalary,
    getWorkingHour
};