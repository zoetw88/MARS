require('dotenv').config();
const validator = require('validator');
const jwt = require('jsonwebtoken')
const {
    ACCESS_TOKEN_SECRET
} = process.env;
const {sendQuestion}= require('../models/chat_model');

const verifyToken = async (req, res, ) => {
    try {
        let bearerHeader = req.header('authorization')
        if (typeof bearerHeader !== 'undefined') {
            let bearerToken = bearerHeader.split(' ')[1]
            let jwt_decoded = jwt.verify(bearerToken, ACCESS_TOKEN_SECRET, (error, data) => {
                if (error) return error
                return data
            })

            res.status(200).send(jwt_decoded)
        } else {
            res.sendStatus(403);
        };

    } catch (error) {
        return {
            error
        };
    }

};

const askQuestion = async (req, res) => {
    try {
      
        let {
            nickname,
            company,
            question
        } = req.body
       await sendQuestion(company,question,nickname)
     res.status(200).send('ok')
    } catch (error) {
        return {
            error
        };
    }

}


const editor = async (req, res) => {
try {
    let {
        nickname
        } = req.query
        res.render('editor2');

    } catch (error) {
        return {
            error
        };
    }
}
module.exports = {
    editor,
    verifyToken,
    askQuestion
};