const {
    query,
    transaction,
    commit,
    rollback
} = require('./mysql');
const {
    fp_alogrithm
} = require('./fp_alogrithm_model');

const moment=require('moment')

const filter_company=async(company)=>{
    
    let query_company = await query(`SELECT company,MATCH (company) AGAINST (?) as score from salary having score >0.2  order by score DESC limit 1`,[company])
        
    if(query_company.length<1){
        query_company=await query('SELECT main_company as company from company_connection where another_name= ?',[company])
    }

    query_company =query_company[0].company

    return query_company
}

const salary = async (company, title, ip) => {

    let final_result;
    let data = [];
    let result_avg;
    let result_2_avg;
    let result_3_avg;

    try {
        await transaction();
        let time =moment().format('YYYY-MM-DD')
        let query_str = {
            ip: `${ip}`,
            company: `${company}`,
            title:`${title}`,
            time:`${time}`
        };

        if (company != null) {
            await query('INSERT INTO recommend SET?', query_str)
        }

        let query_company= await filter_company(company)
      
        let result_company = await fp_alogrithm(query_company)

        let query_salary = `
        WITH salary_avg
            AS (
            SELECT salary,
            experience,company,MATCH (title) AGAINST (?) as score from salary HAVING score > 0.58
        ) 
        SELECT 
           AVG(salary)as salary ,experience,company
        FROM
            salary_avg
        
        Where company IN (?)
        GROUP BY experience 
        `
        let salary_result = await query(query_salary, [title, query_company]);
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

            combine_data(salary_result, result_avg,query_company);
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

        let query_company=await filter_company(company)

        let result_company = await fp_alogrithm(query_company)

        let query_hour = `WITH hourlist 
            AS (
                SELECT
                * ,MATCH (title) AGAINST (?) AS score
                FROM salary
            HAVING score > 0.58
            ) 
            SELECT 
            salary AS y,working_hour AS x,company AS label
            FROM
              hourlist
            WHERE company IN (?)`
       
        let main_salary_result = await query(query_hour,[title, query_company])
   
        let combine_company = [];

        combine_company = combine_company.concat(query_company, result_company[0], result_company[1])
       
        if (main_salary_result.length > 0) {
            let salary_result = await query(query_hour,[ title, combine_company])
            console.log(salary_result)
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


const joblist = async (company, title) => {
    try {
        await transaction();

        company=await filter_company(company)

        let result_company = await fp_alogrithm(company)

        let query_job = `

         WITH joblist 
         AS (
        SELECT * ,MATCH (title) AGAINST (?) AS score FROM job HAVING score > 0.6
            ) 
        SELECT 
            *
        FROM
            joblist
        WHERE company IN 
            ?
        ORDER BY field
            (title,?)`
        let query_company = [];

        query_company = query_company.concat(company, result_company[0], result_company[1])
        
        let job_result = await query(query_job, [title, [query_company], query_company])
    
        if (job_result.length > 0) {
            await commit();
            return job_result
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

async function company(){
    try {
        await transaction();
        let query_company = `SELECT DISTINCT company FROM salary`
        let company_result = await query(query_company)
        
        if (company_result.length > 0) {
            await commit();
            return company_result
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

async function job(){
    try {
        await transaction();
        let query_job = `SELECT DISTINCT title FROM salary`
        let company_result = await query(query_job)
        
        if (company_result.length > 0) {
            await commit();
            return company_result
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
const counter = async (company, title) => {

    try {
        await transaction();
      
        let query_job = `
        WITH joblist AS (
        SELECT * ,MATCH (title) AGAINST (?) AS score FROM job HAVING score > 0.6
        ) 
        SELECT 
            count(title)
         FROM
            joblist
         WHERE company = ?`
        
        let job_count = await query(query_job, [title, company])

             
        let query_comment = `
        WITH commentlist AS (
        SELECT * ,MATCH (title) AGAINST (?) AS score FROM comment HAVING score > 0.6
        ) 
        SELECT 
            count(interview_experience)
         FROM
            commentlist
         WHERE company = ?`

         let comment_count = await query(query_comment, [title, company])

        if (data.length > 0) {
            await commit();
            return job_result
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
    working_hour,
    joblist,
    counter,
    company,
    job,
    filter_company
};
