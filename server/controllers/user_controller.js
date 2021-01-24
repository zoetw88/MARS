require('dotenv').config();
const validator = require('validator');
const User = require('../models/user_model');
const {ACCESS_TOKEN_SECRET} = process.env;
const jwt = require('jsonwebtoken');

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

  if (validator.isEmpty(name) || validator.isEmpty(nickname) || validator.isEmpty(password) || validator.isEmpty(company) || validator.isEmpty(union) || validator.isEmpty(title)) {
    res.status(400).send({
      result: '資訊不完全',
    });
  }
  if (validator.isEmpty(name) || validator.isEmpty(nickname) || validator.isEmpty(password) || validator.isEmpty(company) || validator.isEmpty(union) || validator.isEmpty(title)) {
    res.status(400).send({
      result: '資訊不完全',
    });
  }
  if (!validator.isEmail(email)) {
    res.status(400).send({
      result: 'Invalid email format',
    });
  }
  name = validator.escape(name);

  let result = await User.signUp(name, nickname, email, password, company, union, title);

  if (result.error) {
    result = result.error;
    res.status(403).send(result);
  }
  res.status(200).send(result);
};

const verifyToken = async (req, res, next) => {
  try {
    const userInfo = checktoken(req);
    req.decoded = userInfo;
    next();
  } catch (error) {
    return error;
  }
};

const logout = async (req, res) => {
  try {
    const userInfo = checktoken(req);
    res.status(200).send(userInfo);
  } catch (error) {
    return error;
  }
};

const checktoken = (req) => {
  const bearerHeader = req.header('authorization');
  if (typeof bearerHeader == 'undefined') {
    res.sendStatus(403);
  };
  const bearerToken = bearerHeader.split(' ')[1];
  const userInfo = jwt.verify(bearerToken, ACCESS_TOKEN_SECRET, (error, data) => {
    if (error) throw error;
    return data;
  });
  return userInfo;
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
      res.status(403).send(result);
    }
    res.status(200).send(result);
  } catch (error) {
    return error;
  }
};


const getUserProfile = async (req, res) => {
  const {email} = req.decoded;
  const profile = await User.getUserProfile(email);

  if (profile.error) {
    result = profile.error;
    res.status(403).send(result);
  }
  res.status(200).send(result);
};

module.exports = {
  signUp,
  signIn,
  getUserProfile,
  verifyToken,
  logout,
};
