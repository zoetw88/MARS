const {
    query,
    transaction,
    commit,
    rollback
} = require('./mysql');
const {
    fp_alogrithm
} = require('./fp_alogrithm_model');
const {
    EvalSourceMapDevToolPlugin
} = require('webpack');


const salary = async (company, title, ip) => {

    let final_result;
    let data = [];
    let result_avg;
    let result_2_avg;
    let result_3_avg;

    try {
        await transaction();

        let query_str = {
            ip: `${ip}`,
            company: `${company}`
        };

        if (company != null) {
            await query('INSERT INTO recommend SET?', query_str)
        }

        let result_company = await fp_alogrithm(company)

        let query_salary = `
        WITH salary_avg
            AS (
            SELECT salary,
            experience,company,MATCH (title) AGAINST (?) as score from salary Where company =?HAVING score > 0.6
        ) 
        SELECT 
           AVG(salary)as salary ,experience,company
        FROM
            salary_avg
        GROUP BY experience 
        `
        let salary_result = await query(query_salary, [title, company]);
        let salary_2_result = await query(query_salary, [title, result_company[0]]);
        let salary_3_result = await query(query_salary, [title, result_company[1]]);

        function transInt(salary_result, result_avg) {
            result_avg = [null, null, null, null, null, null, null, null, null, null];
            if (salary_result.length > 0) {
                for (let i = 0; i < salary_result.length; i++) {
                    if (salary_result[i].experience < 11) {
                        let temp = parseInt(salary_result[i].experience)
                        result_avg[temp] = parseInt(salary_result[i].salary)
                    }
                }
            }
            return result_avg
        }

        result_avg = transInt(salary_result, result_avg);
        result_2_avg = transInt(salary_2_result, result_2_avg);
        result_3_avg = transInt(salary_3_result, result_3_avg);

        function combine_data(salary_result, result_avg, company) {
            final_result = {};
            if (salary_result.length > 0) {
                final_result['y'] = result_avg
                final_result['name'] = company
                final_result['x'] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                data.push(final_result)
            }
        }

        if (salary_result.length > 0) {

            combine_data(salary_result, result_avg, company);
            combine_data(salary_2_result, result_2_avg, result_company[0]);
            combine_data(salary_3_result, result_3_avg, result_company[1]);

            await commit();
            return data;

        } else {
            return 'no'
        }

    } catch (error) {
        await rollback();
        return {
            error
        };
    }
};

const working_hour = async (company, title) => {
    try {
        await transaction();

        let result_company = await fp_alogrithm(company)
        let query_hour = `SELECT salary AS y,working_hour AS x,company AS label ,MATCH (title) AGAINST (?) AS score FROM salary WHERE company IN (?) HAVING score > 0.6 ORDER BY FIELD(title,?)`
        let main_salary_result = await query(query_hour, [title, company, company])

        let query_company=[];
        query_company.push(company)
        query_company.push(result_company[0])
        query_company.push(result_company[1])

        if (main_salary_result.length > 0) {

            let salary_result = await query(query_hour, [title, query_company, query_company])

            if (salary_result.length > 0) {
                await commit();
                return salary_result
            }
        } else {
            return 'no'
        }


    } catch (error) {
        await rollback();
        return {
            error
        };
    }
};
module.exports = {
    salary,
    working_hour
};
