require('dotenv').config();
const validator = require('validator');
const User = require('../models/user_model');
const {
    TOKEN_EXPIRE,
    ACCESS_TOKEN_SECRET
} = process.env; // 30 days by seconds
const jwt = require('jsonwebtoken')
const signUp = async (req, res) => {
    let {
        name,
        nickname
    } = req.body;
    const {
        email,
        password
    } = req.body;

    if (!validator.isEmail(email)) {
        res.status(400).send({
            error: 'Request Error: Invalid email format'
        });
        return;
    }
    name = validator.escape(name);
    const result = await User.signUp(name, nickname, email, password);
    if (result.error) {
        res.status(403).send({
            error: result.error
        });
        return;
    }

    res.status(200).send(
        result
    );
};
const verifyToken = async (req, res, next) => {
    const bearerHeader = req.header('authorization')

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1]
        jwt.verify(bearerToken, ACCESS_TOKEN_SECRET, (err, data) => {
            console.log(bearerToken)
            if (err) return console.log(err)
            res.json('ok')
            // req.data = data;
            // req.authenticated = true;
            // console.log(req.decoded)
            // next();
        })
    } else {
        res.sendStatus(401);
    };
};

const facebookSignIn = async (accessToken) => {
    if (!accessToken) {
        return {
            error: 'Request Error: access token is required.',
            status: 400
        };
    }
    try {
        const profile = await User.getFacebookProfile(accessToken);
        const {
            id,
            name,
            email
        } = profile;
        if (!id || !name || !email) {
            return {
                error: 'Permissions Error: facebook access token can not get user id, name or email'
            };
        }

        return await User.facebookSignIn(id, name, email, accessToken);
    } catch (error) {
        return {
            error: error
        };
    }
};
const signIn = async (req, res) => {
    try {
        let data = req.body;
        let result;
        switch (data.provider) {
            case 'native':
                result = await User.nativeSignIn(data.email, data.password);
                break;

            case 'facebook':
                result = await facebookSignIn(data.access_token);
                
                break;
        }
        if (result.error) {
            res.status(403).send({
                error: result.error
            });
            return;
        }
        res.status(200).send(
            result
        );
    } catch (error) {
        res.status(400).json({
            error
        });
    }
}
const getUserProfile = async (req, res) => {
    const token = req.header('Authorization')
    console.log(token)
    const profile = await User.getUserProfile(req.decoded);
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
    facebookSignIn
};