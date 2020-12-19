require('dotenv').config();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const got = require('got');
const salt = parseInt(process.env.BCRYPT_SALT);
const {query, transaction, commit, rollback} = require('./mysql');
const {TOKEN_EXPIRE,ACCESS_TOKEN_SECRET} = process.env

const signUp = async (name,nickname, email, password) => {
    try {
        await transaction();
        let emails = await query('SELECT email FROM user WHERE email = ? FOR UPDATE', [email]);

        if (emails.length > 0){
            await commit();
            return {error: 'Email Already Exists'};
        }
              let users = {
                name:name,
                nickname: nickname,
                email: email,
                password: bcrypt.hashSync(password, salt),
                provider: 'native'
              }
          
              access_token = jwt.sign({
                exp: Math.floor(Date.now() / 1000)+parseInt(TOKEN_EXPIRE),
                email:email,
                nickname: nickname
            }, ACCESS_TOKEN_SECRET)
            
              data = {
                username: nickname,
                accessExpired: Math.floor(Date.now() / 1000)+parseInt(TOKEN_EXPIRE),
                accessToken: access_token,
                useremail:email
              };
              
        await query('INSERT INTO user Set?', users);
        await commit();  
        return {data};

    } catch (error) {
        await rollback();
        return {error};
    }
};
const nativeSignIn = async (email, password) => {
    try {
        await transaction();
      
        let result = await query('SELECT * FROM user WHERE email = ?', [email]);
        if (result.length > 0) {
            await commit();
            let auth = await bcrypt.compare(password, result[0].password);
            if (auth) {
           
                access_token = jwt.sign({
                    exp:Math.floor(Date.now() / 1000)+parseInt(TOKEN_EXPIRE),
                    email:email,
                    nickname: result[0].nickname
                }, ACCESS_TOKEN_SECRET)
                data = {
                    nickname: result[0].nickname,
                    accessExpired: Math.floor(Date.now() / 1000)+parseInt(TOKEN_EXPIRE),
                    accessToken: access_token,
                    email:email
                };
                return {data};
            }
            else{
                return {error: 'password is wrong'};
            }
        }else{
            return {error: 'email is wrong'};
        }
       
    } catch (error) {
        await rollback();
        return {error};
    }
};

const facebookSignIn = async (id, name, email, accessToken) => {
    try {
        await transaction();
        let user = {
            provider: 'facebook',
            email: email,
            nickname: name,
            picture:'https://graph.facebook.com/' + id + '/picture?type=large',
        };

        let users = await query('SELECT id FROM user WHERE email = ? AND provider = \'facebook\' FOR UPDATE', [email]);
        if (users.length === 0) { // Insert new user
            let queryStr = 'insert into user set ?';
             await query(queryStr, user);
        } 
        await commit();
        data = {
            name: name,
            access_token: access_token
        };
        return {data};

    } catch (error) {
        await rollback();
        return {error};
    }
};
const getFacebookProfile = async function(accessToken){
    try {
        let res = await got('https://graph.facebook.com/me?fields=id,name,email&access_token=' + accessToken, {
            responseType: 'json'
        });
        return res.body;

    } catch (error) {

        throw('Permissions Error: facebook access token is wrong');
    }
};

const getUserProfile = async (email) => {
    let results = await query('SELECT * FROM user WHERE email = ?', [email]);
    if (results.length === 0) {
        return {error: 'Invalid Access Token'};
    } else {
        return {
            data:{
                id: results[0].id,
                provider: results[0].provider,
                nickname: results[0].nickname,
                email: results[0].email,
                
            }
        };
    }
};

module.exports = {
    signUp,
    nativeSignIn,
    getUserProfile,
    facebookSignIn, 
    getFacebookProfile
};

