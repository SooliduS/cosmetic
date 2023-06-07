const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const Wallet = require('../../models/walletModel');
const { sendValidationEmail } = require('../../lib/sendEmail');

const handleNewUser = async (req, res) => {
    const { username, password, email, mobileNumber, superior } = req.body;
    if (!username || !password)
        return res
            .status(400)
            .json({ message: 'Username and password are required.' });

    // check for duplicate usernames in the db
    const duplicate = await User.findOne({
        $or: [{ username }, { email }],
    }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    //check superior
    const foundSuperior = await User.findOne({ accountNumber: superior });

    if (!foundSuperior)
        return res
            .status(404)
            .json({ message: 'superior account number not found' });
    if (foundSuperior?.level && foundSuperior?.level < 6)
        return res.status(406).json({ message: 'superior under level 6' });

    try {
        //encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // random 9 digits account number
        const min = 100000000; // Minimum 9-digit number
        const max = 999999999; // Maximum 9-digit number
        const accountNumber = Math.floor(Math.random() * (max - min + 1)) + min;

        //create and store the new user
        const result = await User.create({
            username: username,
            password: hashedPwd,
            email,
            mobileNumber,
            superior,
            accountNumber,
        });

        //create wallet
        const wallet = await Wallet.create({
            owner: result._id,
        });

        result.wallet = wallet._id

        await result.save()

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
