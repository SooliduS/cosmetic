const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const { sendEmail } = require('../../lib/sendEmail');

const sendVerificationEmail = async (req, res) => {
    const emailVerificationNum = Math.floor(
        100000 + Math.random() * 900000
    ).toString();

    try {
        const foundUser = await User.findById(req._id);
        if (!foundUser) return res.sendStatus(401);
        if (foundUser.isEmailConfirmed)
            return res.status(204).josn({ message: 'email already verified' });

        const hashedVerificationNum = await bcrypt.hash(emailVerificationNum, 10);
        foundUser.emailVerificationNum = hashedVerificationNum;
        await foundUser.save();

        sendEmail(
            foundUser.email,
            `<!DOCTYPE html>
            <html lang="fa">
            <head>
              <meta charset="UTF-8">
              <title>تأیید ایمیل</title>
            </head>
            <body style="padding:10px; font-size:14px; background-color: #f5f5f5; " dir="rtl" rtl>
              <h2>تأیید ایمیل</h2>
              <p>سلام ${
                  foundUser.firstname ||
                  foundUser.lastname ||
                  foundUser.username
              }،</p>
              <p>از ثبت نام شما سپاسگزاریم. برای تکمیل فرآیند ثبت نام، لطفاً از کد تأیید زیر استفاده کنید:</p>
              <div>
                <h3>کد تأیید:</h3>
                <center style="padding:20px;"><span style="font-size: 18px; font-weight: bold; background-color:#FFFFFF; padding: 10px">${emailVerificationNum}</span></center>
              </div>
              <p>لطفاً این کد را در صفحه تأیید وارد کنید تا ادامه دهید.</p>
              <p>اگر شما در این سرویس ثبت نام نکرده‌اید، لطفاً این ایمیل را نادیده بگیرید.</p>
              <p>با احترام،</p>
              <p>آرش مارکت</p>
            </body>
            </html>
            `
        );

        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const verifyVerificationEmail = async (req, res) => {
    const { emailVerificationNum } = req.body;

    try {
        const foundUser = await User.findById(req._id);

        if(foundUser.isEmailConfirmed) return res.status(400).json({message:'email already verified'})

        const match = await bcrypt.compare(
            emailVerificationNum,
            foundUser.emailVerificationNum
        );

        if (match) {
            foundUser.isEmailConfirmed = true;
            foundUser.emailVerificationNum = null

            await foundUser.save()
            return res
                .status(200)
                .json({ message: 'email successfully verified' });
        } else
            return res.status(400).json({ message: 'wrong verification code' });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = { sendVerificationEmail, verifyVerificationEmail };
