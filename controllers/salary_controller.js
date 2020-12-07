const {
    salary
} = require('../models/salary_model');

const getSalary = async (req, res) => {
    try {
        let {
            company
        } = req.query;
        console.log(company)
        let all_info = {};
        const result = await salary(company)


        res.status(200).send(result)
    } catch (e) {
        console.log('Catch an error: ', e)
    }


}
module.exports = {
    getSalary
};