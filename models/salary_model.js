const {query, transaction, commit, rollback} = require('./mysql');


const salary = async (company) => {
    try {
        await transaction();
       
        const salary_result = await query(`SELECT AVG(salary)as salary,experience,company FROM salary WHERE company IN ('${company}','台灣積體電路製造股份有限公司','廣達電腦股份有限公司') GROUP BY experience,company`);
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

module.exports = {
   salary
};

