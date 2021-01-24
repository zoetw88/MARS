const {
  query,
  transaction,
  commit,
  rollback,
} = require('./mysql');
const {filterCompany} = require('./filter_model');
const {sendQuestionMail} = require('./email_model');
const validator = require('validator');
const moment = require('moment');


const sendQuestion = async (company, message, nickname) => {
  try {
    await transaction();
    let companyName;
    validator.isEmpty(company) || (companyName = await filterCompany(company));

    if (companyName.length == 0) {
      return error;
    }

    const queryMembers = `SELECT nickname,email FROM user WHERE company =? `;
    const memberslist = await query(queryMembers, [companyName]);
    memberslist.map((user) => {
      const subject = '來自火星的詢問';
      sendQuestionMail(user.email, subject);
    });

    const time = moment().format('YYYY-MM-DD HH:mm:ss');
    const queryQuestion = `INSERT INTO message(sender,receiver,message,time)VALUES?`;
    const queryQuestionStr = [];
    memberslist.map((user) => {
      const askSet = [];
      askSet.push(nickname, user.nickname, message, time);
      queryQuestionStr.push(askSet);
    });
    await query(queryQuestion, [queryQuestionStr]);

    await commit();
  } catch (error) {
    await rollback();
    return error;
  }
};


const getMainMessages = async (username, error) => {
  try {
    queryMainMessages = `
    WITH final_speaker AS(
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
    INNER JOIN user_info on message.sender=user_info.nickname 
    INNER JOIN user2_info on message.receiver=user2_info.nickname
    WHERE (sender = (select sender from final_speaker )AND receiver =(select receiver from final_speaker)) 
    OR (sender =(select receiver from final_speaker ) AND receiver = (select sender from final_speaker ))`;
    const result = await query(queryMainMessages, [username, username]);

    return result.length == 0 ? error : result;
  } catch (error) {
    return error;
  }
};

const getSelectedMessages = async (username, chosenName) => {
  try {
    querySelectedMessages = `   
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
    inner join user2_info on final_speaker.receiver=user2_info.nickname`;
    const result = await query(querySelectedMessages, [username, chosenName, chosenName, username]);

    return result.length == 0 ? error : result;
  } catch (error) {
    return error;
  }
};
const getSideMessages = async (username) => {
  try {
    querySideMessages = `
    WITH user_info AS(
        SELECT company as sender_company ,picture as sender_picture ,nickname
        FROM user
     ),
        user2_info AS(
        SELECT company as receiver_company ,picture as receiver_picture ,nickname
        FROM user
     )
    SELECT sender,receiver,message,receiver_company,receiver_picture,sender_company,sender_picture
    FROM message
    INNER JOIN user_info on user_info.nickname=message.sender 
    INNER JOIN user2_info on user2_info.nickname=message.receiver
    WHERE id IN (
    SELECT MAX(id)
    FROM message
    WHERE sender=? OR receiver=?
    GROUP BY sender,receiver
    )
    ORDER BY id DESC`;
    const result = await query(querySideMessages, [username, username]);

    return result.length == 0 ? error : result;
  } catch (error) {
    return error;
  }
};

const addNewMessages = async (data) => {
  try {
    const time = moment().format('YYYY-MM-DD HH:mm:ss');
    const querystrNewMessage = `INSERT INTO message SET?`;
    const message = {
      sender: data.sender,
      receiver: data.receiver,
      message: data.message,
      time: time,
    };
    await query(querystrNewMessage, message);

    return result.length == 0 ? error : result;
  } catch (error) {
    return error
    ;
  }
};

module.exports = {
  sendQuestion,
  getSelectedMessages,
  getMainMessages,
  getSideMessages,
  addNewMessages,
};
