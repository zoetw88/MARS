require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = parseInt(process.env.BCRYPT_SALT);
const {
  query,
  transaction,
  commit,
  rollback,
} = require('./mysql');
const {
  TOKEN_EXPIRE,
  ACCESS_TOKEN_SECRET,
} = process.env;


const signUp = async (name, nickname, email, password, company, union, title) => {
  try {
    await transaction();
    const queryEmail = `SELECT email FROM user WHERE email = ? FOR UPDATE`;
    const emails = await query(queryEmail, [email]);
    if (emails.length > 0) {
      await commit();
      return {
        error: 'Email Already Exists',
      };
    }
    const users = {
      name: name,
      nickname: nickname,
      email: email,
      password: bcrypt.hashSync(password, salt),
      provider: 'native',
      title: title,
      company: company,
      union: union,
      picture: 'https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/no.5.png',
    };
    accessToken = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + parseInt(TOKEN_EXPIRE),
      email: email,
      nickname: nickname,
      picture: 'https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/no.5.png',
    }, ACCESS_TOKEN_SECRET);
    data = {
      username: nickname,
      accessExpired: Math.floor(Date.now() / 1000) + parseInt(TOKEN_EXPIRE),
      accessToken: accessToken,
      useremail: email,
    };

    await query('INSERT INTO user Set?', users);
    await commit();
    return {
      data,
    };
  } catch (error) {
    await rollback();
    return {
      error,
    };
  }
};
const signIn = async (email, password) => {
  try {
    const result = await query('SELECT * FROM user WHERE email = ?', [email]);
    if (result.length == 0) {
      return {
        error: 'email is wrong',
      }
    };

    const auth = await bcrypt.compare(password, result[0].password);
    if (!auth) {
      return {
        error: 'password is wrong',
      };
    }

    accessToken = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + parseInt(TOKEN_EXPIRE),
      email: email,
      nickname: result[0].nickname,
      picture: result[0].picture,
    }, ACCESS_TOKEN_SECRET);
    data = {
      nickname: result[0].nickname,
      accessExpired: Math.floor(Date.now() / 1000) + parseInt(TOKEN_EXPIRE),
      accessToken: accessToken,
      email: email,
    };
    return {data};
  } catch (error) {
    return {
      error,
    };
  }
};

module.exports = {
  signUp,
  signIn,
};
