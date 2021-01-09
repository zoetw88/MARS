require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const got = require('got');
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
const nativeSignIn = async (email, password) => {
  try {
    const result = await query('SELECT * FROM user WHERE email = ?', [email]);
    if (result.length > 0) {
      const auth = await bcrypt.compare(password, result[0].password);
      if (auth) {
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
        return {
          data,
        };
      } else {
        return {
          error: 'password is wrong',
        };
      }
    } else {
      return {
        error: 'email is wrong',
      };
    }
  } catch (error) {
    return {
      error,
    };
  }
};

const facebookSignIn = async (id, name, email, accessToken) => {
  try {
    await transaction();
    const user = {
      provider: 'facebook',
      email: email,
      nickname: name,
      picture: 'https://graph.facebook.com/' + id + '/picture?type=large',
    };
    const queryFaceBookEmail = `SELECT id FROM user WHERE email = ? AND provider = \'facebook\' FOR UPDATE`;
    const users = await query(queryFaceBookEmail, [email]);

    if (users.length === 0) {
      const queryStr = 'insert into user set ?';
      await query(queryStr, user);
    }
    await commit();
    data = {
      name: name,
      access_token: accessToken,
    };
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
const getFacebookProfile = async function(accessToken) {
  try {
    const res = await got('https://graph.facebook.com/me?fields=id,name,email&access_token=' + accessToken, {
      responseType: 'json',
    });
    return res.body;
  } catch (error) {
    throw new Error('Permissions Error: facebook access token is wrong');
  }
};

const getUserProfile = async (email) => {
  const results = await query('SELECT * FROM user WHERE email = ?', [email]);
  if (results.length === 0) {
    return {
      error: 'Invalid Access Token',
    };
  } else {
    return {
      data: {
        id: results[0].id,
        provider: results[0].provider,
        nickname: results[0].nickname,
        email: results[0].email,
      },
    };
  }
};

module.exports = {
  signUp,
  nativeSignIn,
  getUserProfile,
  facebookSignIn,
  getFacebookProfile,
};
