
const moment=require('moment');
const {
    query,
    transaction,
    commit,
    rollback
} = require('./mysql');

const {
    send_cancel_email
} = require('./email_model');

const sendQuestion = async (company,message,nickname) => {
    try {
        await transaction();
        let query_sender = `select company from user where nickname =? `
        let sender_company= await query(query_sender, [nickname])
        

        let query_email = `select email from user where company =? `
        let user_email_list= await query(query_email, [company])

        await user_email_list.map(user=>{
            let subject = '有人來敲你門';
             send_cancel_email(user.email, subject);
        })

        let query_user = `select nickname from user where company =? `
        let userlist= await query(query_user, [company])
        let query_question = `INSERT INTO message (receiver,message,sender,sendercompany,receivercompany) VALUES ?`

        let ask_sets=[]
        userlist.map(x=>{
        let combine=[]
         let ask=combine.concat(x.nickname,message,nickname,sender_company[0].company,company)
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