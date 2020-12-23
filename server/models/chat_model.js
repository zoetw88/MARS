const {
  query,
  transaction,
  commit,
  rollback
} = require('./mysql');

const {
  sendQuestionMail
} = require('./email_model');

const sendQuestion = async (company, message, nickname) => {
  try {
    await transaction();

    let query_members = `SELECT nickname,email FROM user WHERE company =? `
    let members_list = await query(query_members, [company])

    await members_list.map(user => {
      let subject = '有人來敲你門';
      sendQuestionMail(user.email, subject);
    })

    let query_sender = `SELECT company FROM user WHERE nickname =? `
    let sender_company = await query(query_sender, [nickname])
    let query_question = `INSERT INTO message SET ?`
    let ask_sets = []
    members_list.map(user => {
      let combine = []
      let ask = combine.concat(user.nickname, message, nickname, sender_company[0].company, company)
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


const getMainMessages = async (username, error) => {
  try {
    querystr_main_messages = `
    WITH final_speaker AS(
      SELECT MAX(id),sender,receiver,sendercompany,receivercompany 
      FROM message 
      WHERE (sender =?) OR(receiver=?) 
      GROUP BY sender ,receiver 
      ORDER BY max(id) 
      DESC LIMIT 1
    )
      SELECT * 
      FROM message 
      WHERE (sender = ? AND receiver =(select sender from final_speaker) )
      OR (sender =(select sender from final_speaker) AND receiver = ?)`
    let result = await query(querystr_main_messages, [username, username, username, username])
    if (result.length > 0) {
      return result
    } else {
      return error
    }
  } catch (error) {
    return error
  }
}

const getSelectedMessages = async (username, chosenName) => {
  try {
    querystr_selected_messages = `
        SELECT * 
        FROM message 
        WHERE (sender = ? AND receiver = ?) 
        OR (sender = ? AND receiver = ?)`
    let result = await query(querystr_selected_messages, [username, chosenName, chosenName, username])

    if (result.length > 0) {
      return result
    } else {
      return error
    }

  } catch (error) {
    return error
  }
}
const getSideMessages = async (username) => {

  try {
    querystr_side_messages = `
        SELECT MAX(id),sender,receiver,message,receivercompany,sendercompany 
        FROM message WHERE(sender =?) OR (receiver=?) 
        GROUP BY sender ,receiver ORDER BY max(id) DESC`
    let result = await query(querystr_side_messages, [username, username])
    if (result.length > 0) {
      return result
    } else {
      return error
    }

  } catch (error) {
    return error
  }

}

const newMessages = async (data) => {
  try {
    let querystr_company = `SELECT company FROM user WHERE nickname IN (?)`
    let data_user = [];
    data_user = data_user.concat(data.sender, data.receiver)
    let company_result = await query(querystr_company, [data_user])
    let querystr_new_message = `INSERT INTO message SET?`
    let message = {
      sender: data.sender,
      receiver: data.receiver,
      message: data.message,
      receivercompany: company_result[1].company,
      sendercompany: company_result[0].company
    }
    let result = await query(querystr_new_message, message);

    if (result.length > 0) {
      return result
    } else {
      return error
    }
  } catch (error) {
    return error
  }
}

module.exports = {
  sendQuestion,
  getSelectedMessages,
  getMainMessages,
  getSideMessages,
  newMessages
}