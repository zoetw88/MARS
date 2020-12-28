const {
  query,
  transaction,
  commit,
  rollback
} = require('./mysql');

const {
  sendQuestionMail
} = require('./email_model');

const  moment = require('moment')

const sendQuestion = async (company, message, nickname) => {
  try {
    await transaction();

    let query_members = `SELECT nickname,email FROM user WHERE company =? `
    let members_list = await query(query_members, [company])

    await members_list.map(user => {
      let subject = '有人來敲你門';
      sendQuestionMail(user.email, subject);
    })


    let query_question = `INSERT INTO message (sender,receiver,message) VALUES?`
    let ask_sets = []
    members_list.map(user => {
      let combine = []
      combine = combine.concat(nickname, user.nickname, message)
      ask_sets.push(combine)
    })

    let result = await query(query_question, [ask_sets])

    console.log(result)
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
    WITH final_speaker  AS(
      SELECT MAX(id),sender,receiver
      FROM message 
      WHERE (sender =?) OR(receiver=?) 
      GROUP BY sender ,receiver 
      ORDER BY max(id) 
      DESC LIMIT 1
    ),
    user_info AS(
      SELECT company as sender_company ,picture as sender_picture ,nickname
      FROM user
    ),
      user2_info AS(
      SELECT company as receiver_company ,picture as receiver_picture ,nickname
      FROM user
    )
	  SELECT sender,receiver,message,receiver_company,receiver_picture,sender_company,sender_picture
	  FROM message 
	  inner join user_info on message.sender=user_info.nickname 
    inner join user2_info on message.receiver=user2_info.nickname
	  WHERE (sender = (select sender from final_speaker )AND receiver =(select receiver from final_speaker) ) OR (sender =(select receiver from final_speaker ) AND receiver = (select sender from final_speaker ))`
    let result = await query(querystr_main_messages, [username, username])

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
    WITH final_speaker  AS(
      SELECT sender,receiver,message
      FROM message 
      WHERE (sender = ? AND receiver = ?) 
      OR (sender = ? AND receiver = ?)
    ),
    user_info AS(
      SELECT company as sender_company ,picture as sender_picture ,nickname
      FROM user
    ),
      user2_info AS(
      SELECT company as receiver_company ,picture as receiver_picture ,nickname
      FROM user
    )
    SELECT sender,receiver,message,receiver_company,receiver_picture,sender_company,sender_picture
    FROM final_speaker
    inner join user_info on final_speaker.sender=user_info.nickname 
    inner join user2_info on final_speaker.receiver=user2_info.nickname`
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
             
    With user_info AS(
      SELECT company as sender_company ,picture as sender_picture ,nickname
       FROM user
     ),
     user2_info AS(
       SELECT company as receiver_company ,picture as receiver_picture ,nickname
       FROM user
     )
    SELECT sender,receiver,message,receiver_company,receiver_picture,sender_company,sender_picture
     FROM message
     inner join user_info on user_info.nickname=message.sender 
     inner join user2_info on user2_info.nickname=message.receiver
     
    WHERE id IN (
      SELECT MAX(id)
      FROM message
      where sender=?OR receiver=?
      GROUP BY sender,receiver
      )ORDER BY id DESC`
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
    let querystr_company = `SELECT company,picture FROM user WHERE nickname IN (?)`
    let data_user = [];
    data_user = data_user.concat(data.sender, data.receiver)
    let company_result = await query(querystr_company, [data_user])
    let querystr_new_message = `INSERT INTO message SET?`
    let message = {
      sender: data.sender,
      receiver: data.receiver,
      message: data.message
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