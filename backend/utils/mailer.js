const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL, alternative is 587 with `secure: false`
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    },
    maxConnections: 5,
    maxMessages: 10,
    rateLimit: 5    
});

const sendEmail = (email, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject,
        text
    };

   return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports =  sendEmail;