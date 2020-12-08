const {
    salary, working_hour
} = require('../models/salary_model');
const fs = require('fs');
const getSalary = async (req, res) => {
    try {
        let company= req.query.company;
        let year=req.query.year
     
    
        const result = await salary(company,year)
      

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
      

        const result = await working_hour(company)
        const sendJSON =await JSON.stringify(result)
        console.log(sendJSON)
        await fs.writeFile('C:/Users/zoetw/Documents/GitHub/WenChang/public/json/chart2.json',sendJSON,function(err, result) {
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