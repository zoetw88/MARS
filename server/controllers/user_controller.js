require('dotenv').config();
const validator = require('validator');
const User = require('../models/user_model');
const {
    TOKEN_EXPIRE,
    ACCESS_TOKEN_SECRET
} = process.env; 
const jwt = require('jsonwebtoken')
const signUp = async (req, res) => {
    let {
        name,
        nickname,
        email,
        password,
        union,
        title,
        company
    } = req.body;
 
    if(validator.isEmpty(name)||validator.isEmpty(nickname)||validator.isEmpty(password)||validator.isEmpty(company)||validator.isEmpty(union)||validator.isEmpty(title)){
        res.status(400).send({
            result: '資訊不完全'
        });
        return;
    }
    if (!validator.isEmail(email)) {
        res.status(400).send({
            result: 'Invalid email format'
        });
        return;
    }
    name = validator.escape(name);
    let result = await User.signUp(name, nickname, email, password,company,union,title);
    if (result.error) {
        result=result.error
        res.status(403).send({
           result
        });
        return;
    }

    res.status(200).send(
        result
    );
};



const verifyToken = async (req, res, next) => {
  try{  const bearerHeader = req.header('authorization')

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]
        let jwt_decoded=jwt.verify(bearerToken, ACCESS_TOKEN_SECRET, (error, data) => {
            if (error) return error
            return data
        })
        req.decoded=jwt_decoded
    
        next()
    } else {
        res.sendStatus(403);
    };
}
catch(error){
    return error
}
};

const signIn = async (req, res) => {
    try {
        let data = req.body;
        let result;
        if (!validator.isEmail(data.email)) {
            res.status(400).send({
                result: 'Invalid email format'
            });
            return;
        }
        switch (data.provider) {
            case 'native':
                result = await User.nativeSignIn(data.email, data.password);
        
                break;

            case 'facebook':
                result = await facebookSignIn(data.access_token);
                
                break;
        }
        if (result.error) {
            result=result.error
            res.status(403).send({
               result
            });
        }else{
        res.status(200).send(
            result
        )};
    } catch (error) {
        res.status(400).json({
            error
        });
    }
}

const logout = async (req, res) => {
  try{  const bearerHeader = req.header('authorization')

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]
        let result=jwt.verify(bearerToken, ACCESS_TOKEN_SECRET, (error, data) => {
            if (error) return error
            return data
        })

        res.status(200).send(result)
    
    } else {
        res.sendStatus(403);
    };
}
catch(error){
    return error
}}

const getUserProfile = async (req, res) => {
    let {email}=req.decoded
    const profile = await User.getUserProfile(email);
    if (profile.error) {
        res.status(403).send({
            error: profile.error
        });
    } else {
        res.status(200).send(profile);
    }
};

module.exports = {
    signUp,
    signIn,
    getUserProfile,
    verifyToken,
    logout
};