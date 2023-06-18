const transporter = require('../config/nodemailer');

const sendEmail = (address , content ) => {
    //send validation email
    console.log(address);
    console.log(content);
    const options = {
        from: 'amirreza.setorg@outlook.com',
        to: address,
        subject: 'Verification Email',
        html: content,
    };

    transporter.sendMail(options, (err, info) => {
        console.log(err);
        if (err) throw new Error("can't send email ");
        console.log('info :' + info.response);
    });
};

module.exports = {sendEmail};