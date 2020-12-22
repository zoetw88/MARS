const nodemailer = require('nodemailer');
const env = process.env.NODE_ENV || 'production';
const {Email_Address,Email_Password}= process.env
// const hbs=require('nodemailer-express-handlebars');

// function send_welcome_email(user_email,subject){
// var transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: Email_Address,
//         pass: Email_Password
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });
// transporter.use('compile',hbs({
//     viewEngine:'express-handlebars',
//     viewPath:'./views/'
// }))
// var options = {
//     from: Email_Address,
//     to: user_email, 
//     subject: subject, 
//     template:'index', 
// };

// transporter.sendMail(options, function(error, info){
//     if(error){
//         throw error
//     }else{
//         console.log('訊息發送: ' + info.response);
//     }
// })
// }


function send_cancel_email(user_email,subject,text){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: Email_Address,
            pass: Email_Password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    var options = {
        from: Email_Address,
        to: user_email, 
        subject: subject,
        text:text, 
        html:"<p><strong>時尚之路，你永不孤單!永遠歡迎你的回歸----StylishDream團隊</strong></p><img src =https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/catwalk_308480654_1000.jpg></img>"
    };
    
    transporter.sendMail(options, function(error, info){
        if(error){
            throw error;
        }else{
            console.log('訊息發送: ' + info.response);
        }
    })
    }


    
// function send_order_email(user_email,subject,text){
//     var transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: Email_Address,
//             pass: Email_Password
//         },
//         tls: {
//             rejectUnauthorized: false
//         }
//     });
//     var options = {
//         from: Email_Address,
//         to: user_email, 
//         subject: subject,
//         text:text, 
        
//     };
    
//     transporter.sendMail(options, function(error, info){
//         if(error){
//             throw error;
//         }else{
//             console.log('訊息發送: ' + info.response);
//         }
//     })
//     }
module.exports = {
//   send_welcome_email,
//   send_order_email,
  send_cancel_email
};