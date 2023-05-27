const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const { sendValidationEmail } = require('../../lib/sendEmail');

const handleNewUser = async (req, res) => {
    const { username, password, email, mobileNumber } = req.body;
    if (!username || !password)
        return res
            .status(400)
            .json({ message: 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({
        $or: [{ username }, { email }],
    }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        //create and store the new user
        const result = await User.create({
            username: username,
            password: hashedPwd,
            email,
            mobileNumber,
        });

        //send validation email
        sendValidationEmail(result.email);

        console.log(result);

        res.status(201).json({
            success: `New user ${username} created!`,
            user: result,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { handleNewUser };
