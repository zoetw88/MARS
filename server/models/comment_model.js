const {query, transaction, commit, rollback} = require('./mysql');

const extract_comments = async (company,title) => {
    try {
        await transaction();
        console.log(company)
        let result = await query(`select * ,MATCH (title) AGAINST ('${title}') as score from comment Where company="${company}" HAVING score > 0.6 ORDER BY score DESC `);
        console.log(result)
        await commit();
        return result;
    } catch (error) {
        await rollback();
        return error;
    }
    
};
const extract_comments_company = async (company) => {
    try {
        await transaction();
        const result = await query('SELECT interview_experience FROM comment WHERE company = ? ', [company]);
        
        if (result.length > 0){
            await commit();
            return {result};
        }
    } catch (error) {
        await rollback();
        return {error};
    }
};
module.exports={
    extract_comments,
    extract_comments_company 
}