const {query, transaction, commit, rollback} = require('./mysql');

const extract_comments = async (company,title, length) => {
    try {
        await transaction();
        const result = await query('SELECT interview_experience FROM comment WHERE company = ? And title= ?', [company,title]);
        
        if (result.length > 0){
            await commit();
            return {result};
        }
    } catch (error) {
        await rollback();
        return {error};
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