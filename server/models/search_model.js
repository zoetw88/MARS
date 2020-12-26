const {
    query,
    transaction,
    commit,
    rollback
} = require('./mysql');
const {
    fp_alogrithm
} = require('./fp_alogrithm_model');

const moment = require('moment')
const validator = require('validator')

const filter_company = async (company) => {

    let querystr_company = `
    SELECT company,MATCH (company) AGAINST (?) AS score 
    FROM salary HAVING score >0.2 ORDER BY score DESC limit 1`

    let query_company = await query(querystr_company, [company])

    if (query_company.length < 1) {
        let querystr_company = `
        SELECT main_company AS company 
        FROM company_connection WHERE another_name= ?`
        query_company = await query(querystr_company, [company])
        if (query_company.length <1){
            return 'no'
        }
    }

    query_company = query_company[0].company
   
    return query_company
}
const filter_title=async(title)=>{

    if(title.indexOf('工程師'))
    {   
        title_split=title.split('工程師')[0].toString()
        title=title_split
    }else(title.indexOf(''))
    {
        title_split=title.split(" ").toString()
        title=title_split
    }
    
    let query_title = `
    SELECT career ,category
    FROM career_connection 
    WHERE career=? or category=?`
    let title_result = await query(query_title, [title,title])
    if (title_result.length>0){
    let combine_title = [];
    title_result.map(title => {
        combine_title.push(title.career,title.category)
    })
    combine_title.push(title)
   
    let final_title = combine_title.join()
    return final_title
    }
    else{
        return title
    }
}
const salary = async (company, title, ip) => {
    try {

        await transaction();
        let time = moment().format('YYYY-MM-DD')

        let query_company = await filter_company(company)
        if (query_company!='no'){
            let query_str = {
                ip: `${ip}`,
                company: `${query_company}`,
                title: `${title}`,
                time: `${time}`
            };
    
            await query('INSERT INTO recommend SET?', query_str)
        }
      

        function transInt(salary_result) {
            let result_avg = [null, null, null, null, null, null, null, null, null, null];
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

        function organizeData(salary_result) {
            if (salary_result.length > 0) {
                let data = [];
                let extract_company = salary_result.map(data => data.company)
                let company_list = Array.from(new Set(extract_company));
                company_list.map(company => {
                    let single_company = salary_result
                        .filter(x => x.company == company)

                    data.push(single_company)

                })
                return data
            }
        }

        function combineData(salary_data) {
            let data = [];
            for (i = 0; i < salary_data.length; i++) {
                let final_result = {};
                final_result['y'] = transInt(salary_data[i])
                final_result['name'] = salary_data[i][0].company
                final_result['x'] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
                data.push(final_result)
            }
            return data
        }

        if (!validator.isEmpty(company) && !validator.isEmpty(title)) {
            let final_title=await filter_title(title)
            let query_company = await filter_company(company)
            if (query_company=='no'){
                return 'no'
            }
            let result_company = await fp_alogrithm(query_company)
            let query_salary = `
                WITH salary_avg AS (
                    SELECT salary,experience,company,MATCH (title) AGAINST (?) as score 
                    FROM salary HAVING score > 0.05 order by score DESC
                    ) 
                    SELECT AVG(salary)as salary ,experience,company
                    FROM salary_avg Where company IN (?) GROUP BY experience `

            let combineCompany = [];
            combineCompany = combineCompany.concat(query_company, result_company[0], result_company[1])
            let salary_result = await query(query_salary, [final_title, combineCompany]);

            if (salary_result.length > 0) {
                let all_data = organizeData(salary_result)
                let data = combineData(all_data);

                await commit();

                return data;

            } else {
                
                return 'no'
            }
        } else if (validator.isEmpty(company)) {
            let final_title=await filter_title(title)
           
            let query_salary_title = `
                with company_list as(
                    SELECT salary,experience,company ,MATCH (title) AGAINST (?) as score 
                    FROM salary having score>0.05  order by score DESC
                    )
                    SELECT company ,experience ,AVG(salary)as salary 
                    FROM company_list 
                    WHERE experience <11
                    GROUP BY experience`
            
            let salary_result = await query(query_salary_title, [final_title]);
                   
            if (salary_result.length > 0) {

                let title_data = organizeData(salary_result)
                let result = combineData(title_data)

                await commit();

                return result

            } else {
               
                return 'no'
            }

        } else if (validator.isEmpty(title)) {
          
            let query_company = await filter_company(company)
            if (query_company=='no'){
                return 'no'
            }
            let result_company = await fp_alogrithm(query_company)
            let query_salary_company = `
            with company_list as(
                SELECT salary,experience,company 
                FROM salary 
                WHERE company IN(?)
                )
                SELECT company ,experience ,AVG(salary)as salary 
                FROM company_list
                GROUP BY company,experience`
            let combineCompany = [];
            combineCompany = combineCompany.concat(query_company, result_company[0], result_company[1])

            let salary_result = await query(query_salary_company, [combineCompany]);

            if (salary_result.length > 0) {

                let company_data = organizeData(salary_result)
                let result = combineData(company_data)
                await commit();

                return result

            } else {
               
                return 'no'
            }

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
        let final_title=await filter_title(title)
      
        if (!validator.isEmpty(company) && !validator.isEmpty(title)) {

            let query_company = await filter_company(company)
            if (query_company=='no'){
                return 'no'
            }
            let result_company = await fp_alogrithm(query_company)

            let query_hour = `
            WITH hourlist AS (
                SELECT * ,MATCH (title) AGAINST (?) AS score
                FROM salary HAVING score > 0.05 order by score DESC
                    ) 
                SELECT (salary/1000000) AS y,working_hour AS x,company AS label
                FROM hourlist WHERE company IN (?)`

            let main_salary_result = await query(query_hour, [final_title, query_company])

            let combine_company = [];

            combine_company = combine_company.concat(query_company, result_company[0], result_company[1])

            if (main_salary_result.length > 0) {
                let salary_result = await query(query_hour, [final_title, combine_company])
                
                if (salary_result.length > 0) {
                    await commit();
                    return salary_result
                }
            } else {
                return 'no'
            }

        } else if (validator.isEmpty(title)) {
            let query_company = await filter_company(company)
            if (query_company=='no'){
                return 'no'
            }
            let result_company = await fp_alogrithm(query_company)

            let query_hour = `
            SELECT (salary/1000000) AS y,working_hour AS x,company AS label
            FROM salary WHERE company IN (?)`

            let main_salary_result = await query(query_hour, [query_company])

            let combine_company = [];

            combine_company = combine_company.concat(query_company, result_company[0], result_company[1])

            if (main_salary_result.length > 0) {
                let salary_result = await query(query_hour, [combine_company])
               
                if (salary_result.length > 0) {
                    await commit();
                    return salary_result
                }
            } else {
                return 'no'
            }


        } else if (validator.isEmpty(company)) {
            let final_title=await filter_title(title)
            let query_hour = `
            WITH hourlist AS (
                SELECT id, (salary/1000000) AS y,working_hour AS x,company AS label ,MATCH (title) AGAINST (?) AS score
                FROM salary HAVING score > 0.05 order by score DESC
                   ) 
               SELECT  y,x,h1.label
               FROM hourlist h1`
                
            let salary_result = await query(query_hour, [final_title])

            if (salary_result.length > 0) {
                await commit();
                return salary_result

            } else {
                return 'no'
            }


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
        if(!validator.isEmpty(company) && !validator.isEmpty(title)) {

            let query_company = await filter_company(company)

            if (query_company == 'no') {
                return 'no'
            }

            let result_company = await fp_alogrithm(query_company)
            let final_title=await filter_title(title)
            let query_job = `
            WITH joblist AS (
            SELECT * ,MATCH (title) AGAINST (?) AS score 
            FROM job HAVING score > 0.05 order by score DESC
                ) 
            SELECT * FROM joblist 
            WHERE company IN (?) ORDER BY field (company,?)`
            let combine_company = [];

            combine_company = combine_company.concat(query_company, result_company[0], result_company[1])

            let job_result = await query(query_job, [final_title, combine_company,combine_company])

            if (job_result.length > 0) {
                await commit();
                return job_result
            } else { 

                return 'no'
            }

        }  else if (validator.isEmpty(company)) {

            let final_title=await filter_title(title)
            
            let query_job = `
            SELECT * ,MATCH (title) AGAINST (?) AS score 
            FROM job HAVING score > 0.6 ORDER BY score DESC`
            
            let job_result = await query(query_job, [final_title])

            if (job_result.length > 0) {
                await commit();
                return job_result
            } else {
                return 'no'
            }
        }else if (validator.isEmpty(title)) {

            let query_company = await filter_company(company)
        
            if (query_company == 'no') {
                return 'no'
            }

            let result_company = await fp_alogrithm(query_company)

            let query_job = `

            SELECT * 
            FROM job 
            WHERE company IN(?) ORDER BY field (company,?)`
            let combine_company = [];

            combine_company = combine_company.concat(query_company, result_company[0], result_company[1])

            let job_result = await query(query_job, [combine_company, combine_company])
            
            if (job_result.length > 0) {
                await commit();
                return job_result
            } else {

                return 'no'
            }
        }
    } catch (error) {
        await rollback();
        return {
            error
        };
    }
};

async function company() {
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

async function job() {
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

module.exports = {
    salary,
    working_hour,
    joblist,
    company,
    job,
    filter_company,
    filter_title
};