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
        html:"<p><strong>台灣職場生態改變由你做起!!有人詢問貴司相關問題。</strong><p>http://18.136.112.92/api/1.0/chat.html</p></p><img src =https://zoesandbox.s3-ap-southeast-1.amazonaws.com/img/rules-good-co-worker-relationship1.jpg></img>"
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