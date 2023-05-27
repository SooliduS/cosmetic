const transporter = require('../config/nodemailer');
const jwt = require('jsonwebtoken');

const sendValidationEmail = (address) => {

    const emailValidationToken = jwt.sign(
        {
            Info: {
                email:address,
            },
        },
        process.env.EMAIL_VERIFICATION_TOKEN,
        { expiresIn: '1d' }
    );

    //send validation email
    const options = {
        from: 'amirreza.setorg@outlook.com',
        to: address,
        subject: 'Verification Email',
        html: `<h1>Hello!</h1><p>please click the link below to verify your email address</p><p><a>https://cosmetic-backend.iran.liara.run/emailconfirmation/${emailValidationToken}</a></p>`,
    };

    transporter.sendMail(options, (err, info) => {
        console.log(err);
        if (err) throw new Error("can't send email ");
        console.log('info :' + info.response);
    });
};

module.exports = {sendValidationEmail};