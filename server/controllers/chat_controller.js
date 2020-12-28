require('dotenv').config();
const jwt = require('jsonwebtoken')
const {
    ACCESS_TOKEN_SECRET
} = process.env;
const {sendQuestion}= require('../models/chat_model');
const path=require('path')
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
       let result=await sendQuestion(company,question,nickname)
       console.log(result)
     res.status(200).send(result)
    } catch (error) {
        return {
            error
        };
    }

}


const editor = async (req, res) => {
try {
    let {room} = req.query
    let {id}=req.query
    res.sendFile(path.join(__dirname,'../../public/api/1.0/editor.html'));
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