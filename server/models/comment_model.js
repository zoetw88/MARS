const {
    query,
    transaction,
    commit,
    rollback
} = require('./mysql');
const {
    fp_alogrithm
} = require('./fp_alogrithm_model')
const {
    filter_company,
    filter_title
} = require('./search_model')

const validator = require('validator');


const extract_comments = async (company, title) => {
    try {
        await transaction();
        if (!validator.isEmpty(company) && !validator.isEmpty(title)) {
            query_company = await filter_company(company)
            let final_title = await filter_title(title)
            if (query_company == 'no') {
                return 'no'
            }
            let result_company_filter = await fp_alogrithm(query_company)

            let combine_company = [];

            combine_company = combine_company.concat(query_company, result_company_filter[0], result_company_filter[1])

            let querystr_company = `
            with comments_list as(
                SELECT *,MATCH (title) AGAINST (?) as score 
                FROM comment having score>0.05  order by score DESC
                )
                SELECT *
                FROM comments_list WHERE company IN (?) 
                ORDER BY useful DESC`
          
            let result = await query(querystr_company, [final_title, combine_company])

            if (result.length > 0) {
                await commit();
                return result;
            } else {
                await rollback()
                return 'no'
            }
        } else if (validator.isEmpty(company)) {
           
            let final_title = await filter_title(title)
            let querystr_company = `
            with comments_list as(
                SELECT *,MATCH (title) AGAINST (?) as score 
                FROM comment having score>0.05  order by score DESC
                )
                SELECT *
                FROM comments_list 
                ORDER BY useful DESC`

            let result = await query(querystr_company, [final_title])

            if (result.length > 0) {
                await commit();
                return result;
            } else {
                await rollback()
                return 'no'
            }



        } else if (validator.isEmpty(title)) {
            query_company = await filter_company(company)
            if (query_company == 'no') {
                return 'no'
            }
            let result_company_filter = await fp_alogrithm(query_company)
            let combine_company = [];

            combine_company = combine_company.concat(query_company, result_company_filter[0], result_company_filter[1])
         
            let querystr_company = `
                SELECT *
                FROM comment WHERE company IN (?) 
                ORDER BY useful DESC`

            let result = await query(querystr_company, [combine_company ])

            if (result.length > 0) {
                await commit();
                return result;
            } else {
                await rollback()
                return 'no'
            }

        }

    } catch (error) {
        await rollback();
        return error;
    }



};

const extract_allcomments = async (company, title) => {
    try {
        await transaction();
      
            let querystr_company = `
                SELECT * 
                FROM comment `
                

            let result = await query(querystr_company)

            if (result.length > 0) {
                await commit();
                return result;
            } else {
                await rollback()
                return 'no'
            }
       

    } catch (error) {
        await rollback();
        return error;
    }



};
module.exports = {
    extract_comments,
    extract_allcomments,
}