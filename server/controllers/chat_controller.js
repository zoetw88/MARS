require('dotenv').config();
const validator = require('validator');
const User = require('../models/user_model');
const {
    TOKEN_EXPIRE,
    ACCESS_TOKEN_SECRET
} = process.env; 
const jwt = require('jsonwebtoken')
const verifyToken = async (req, res, ) => {
    try{  const bearerHeader = req.header('authorization')
      if (typeof bearerHeader !== 'undefined') {
          const bearerToken = bearerHeader.split(' ')[1]
          let jwt_decoded=jwt.verify(bearerToken, ACCESS_TOKEN_SECRET, (error, data) => {
              if (error) return error
              return data
          })
        console.log('send')
        res.status(200).send(jwt_decoded)
      } else {
          res.sendStatus(403);
      };
  }
  catch(error){
      return error
  }
  };

const editor = async (req, res) => {
    try {
        let {nickname} = req.query
        res.render('editor2');
    } catch (e) {
        console.log('Catch an error: ', e)
    }
}
module.exports = {
    editor,
    verifyToken
};