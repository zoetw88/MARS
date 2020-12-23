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
    filter_company
} = require('./search_model')


const extract_comments = async (company, title) => {
    try {
        await transaction();
        company = await filter_company(company)
        let result_company_filter = await fp_alogrithm(company)
        let result_company = [];

        result_company.push(company)
        result_company.push(result_company_filter[0])
        result_company.push(result_company_filter[1])

        let querystr_company = `
        SELECT * ,MATCH (title) AGAINST ('${title}') AS score 
        FROM comment WHERE company IN (?) 
        HAVING score > 0.6 ORDER BY FIELD(title,?)`

        let result = await query(querystr_company, [result_company, result_company])

        await commit();
        return result;

    } catch (error) {
        await rollback();
        return error;
    }

};
const extract_comments_company = async (company, title) => {
    try {
        await transaction();
        company = await filter_company(company)

        let querystr_comments_company = `
        SELECT * ,MATCH (title) AGAINST (?) as score 
        FROM comment WHERE company IN (?) 
        HAVING score > 0.6`

        let result = await query(querystr_comments_company, [title, company]);

        if (result.length > 0) {
            await commit();
            return {
                result
            };
        }
    } catch (error) {
        await rollback();
        return {
            error
        };
    }
};

const extract_comments_title = async (title) => {
    try {
        await transaction();

        let querystr_comments_title = `
        SELECT * ,MATCH (title) AGAINST (?) as score 
        FROM comment 
        HAVING score > 0.6`

        let result = await query(querystr_comments_title, [title]);

        if (result.length > 0) {
            await commit();
            return {
                result
            };
        }
    } catch (error) {
        await rollback();
        return {
            error
        };
    }
};

const extract_comments_single = async () => {
    try {
        await transaction();

        let result = await query(`SELECT * from comment`);

        if (result.length > 0) {
            await commit();
            return {
                result
            };
        }
    } catch (error) {
        await rollback();
        return {
            error
        };
    }
};
module.exports = {
    extract_comments,
    extract_comments_company,
    extract_comments_title,
    extract_comments_single
}