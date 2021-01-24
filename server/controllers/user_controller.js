require('dotenv').config();
const validator = require('validator');
const User = require('../models/user_model');
const {
  ACCESS_TOKEN_SECRET,
} = process.env;
const jwt = require('jsonwebtoken');
const {
  isWordandNumber,
  isWord,
} = require('../utils/utils');
const passwordValidator = require('password-validator');


const signUp = async (req, res) => {
  let {
    name,
    nickname,
    email,
    password,
    union,
    title,
    company,
  } = req.body;

  let result = verifyFormat(name, nickname, email, password, company, union, title);
  if (result.error) {
    res.status(403).send({
      result: `${result.error}`,
    });
    return;
  }

  name = validator.escape(name);
  result = await User.signUp(name, nickname, email, password, company, union, title);


  res.status(200).send(result);
};


const verifyFormat = (name, nickname, email, password, company, union, title) => {
  if (validator.isEmpty(name) || validator.isEmpty(nickname) || validator.isEmpty(password) || validator.isEmpty(company) || validator.isEmpty(union) || validator.isEmpty(title)) {
    return {
      error: '資訊不完全',
    };
  }
  if (!isWord(name) || !isWord(title)) {
    return {
      error: '名字和職稱的格式須為中文或英文',
    };
  }
  if (!isWordandNumber(nickname) || !isWordandNumber(password) || !isWordandNumber(company) || !isWordandNumber(union) || !isWordandNumber(title)) {
    return {
      error: '輸入格式須為中文，英文和數字',
    };
  }
  if (!validator.isEmail(email)) {
    return {
      error: 'Invalid email format',
    };
  }
  const schema = new passwordValidator();
  schema
      .is().min(8)
      .is().max(100)
      .has().uppercase()
      .has().lowercase()
      .has().not().spaces();

  if (!schema.validate(password)) {
    return {
      error: `密碼格式需要有 ${schema.validate(password, {list: true})}`,
    };
  }
  return 'OK';
};


const verifyToken = async (req, res) => {
  try {
    const bearerHeader = req.header('authorization');
    if (typeof bearerHeader == 'undefined') {
      res.sendStatus(403);
    };
    const bearerToken = bearerHeader.split(' ')[1];
    const userInfo = jwt.verify(bearerToken, ACCESS_TOKEN_SECRET, (error, data) => {
      if (error) throw error;
      return data;
    });
    res.status(200).send(userInfo);
  } catch (error) {
    return error;
  }
};


const signIn = async (req, res) => {
  try {
    const data = req.body;
    let result;
    if (!validator.isEmail(data.email)) {
      res.status(400).send({
        result: 'Invalid email format',
      });
    }
    result = await User.signIn(data.email, data.password);

    if (result.error) {
      result = result.error;
      res.status(403).send({
        result: result,
      });
      return;
    }
    res.status(200).send(result);
  } catch (error) {
    return error;
  }
};


module.exports = {
  signUp,
  signIn,
  verifyToken,
};
