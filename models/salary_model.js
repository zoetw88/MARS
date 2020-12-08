const {query, transaction, commit, rollback} = require('./mysql');


const salary = async (company,year) => {
    try {
        await transaction();
        let up_year=year+3
        const salary_result = await query(`SELECT AVG(salary)as salary,experience,company FROM salary WHERE company IN ('${company}','台灣積體電路製造股份有限公司','廣達電腦股份有限公司')AND experience GROUP BY experience,company`);
        if (salary_result.length > 0){
            await commit();
            console.log(salary_result)
            return salary_result;
        }
    } catch (error) {
        await rollback();
        return {error};
    }
};
const working_hour = async (company) => {
    try {
        await transaction();
       
        const salary_result = await query(`SELECT salary as y,working_hour as x,company as label FROM salary WHERE company IN ('${company}','台灣積體電路製造股份有限公司','仁寶電腦工業股份有限公司')`) ;
        if (salary_result.length > 0){
            await commit();
            console.log(salary_result)
            return salary_result;
        }
        }
    catch (error) {
        await rollback();
        return {error};
    }
};
module.exports = {
   salary,
   working_hour
};

