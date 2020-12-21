
const moment=require('moment');
const {
    query,
    transaction,
    commit,
    rollback
} = require('./mysql');


const sendQuestion = async (company,message,nickname) => {
    try {
        await transaction();
        
        let query_user = `select nickname from user where company =? `
        let userlist= await query(query_user, [company])
        let query_question = `INSERT INTO message (receiver,message,sender) VALUES ?`

        let ask_sets=[]
        userlist.map(x=>{
        let combine=[]
         let ask=combine.concat(x.nickname,message,nickname)
            ask_sets.push(ask)
        })
       
        await query(query_question, [ask_sets])
        await commit();
           
    
    } catch (error) {
        await rollback();
        return {
            error
        };
    }
};
module.exports={
  sendQuestion
}