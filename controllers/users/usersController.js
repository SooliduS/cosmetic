const User = require('../../models/userModel');
const bcrypt = require('bcrypt');


const getAllUsers = async (req, res) => {

    const {offset , limit} = req.query

    try{
    const users = await User.find().skip(Number(offset)).limit(Number(limit));
    if (!users) return res.status(204).json({ message: 'No users found' });
    res.json(users);
    }catch(e){
        return res.status(500).json({ message: e.message });
    }

};

const deleteUser = async (req, res) => {
    try{
 if (!req?.body?.id)
        return res.status(400).json({ message: 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res
            .status(204)
            .json({ message: `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
    }catch(e){
        return res.status(500).json({ message: e.message });
    }
   
};

const getUser = async (req, res) => {
    try{
  if (!req?.params?.id)
        return res.status(400).json({ message: 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res
            .status(204)
            .json({ message: `User ID ${req.params.id} not found` });
    }
    res.json(user);
    }catch(e){
        return res.status(500).json({ message: e.message });
    }
  
};

const updateUser = async (req , res) => {

    const { username , address , instagram , socialMedias , firstname , lastname , melliCode , bankShabaNumber , bankCardNumber } = req.body

    try{
        const foundUser = await User.findById(req._id)
        if(!foundUser) return res.sendStatus(404)

        const duplicate = await User.findOne({username})

        if(duplicate) return res.status(409).json({message:'username used'})
 
        if(username) foundUser.username = username
        if(address) foundUser.address = address
        if(instagram) foundUser.instagram = instagram
        if(socialMedias) foundUser.socialMedias = socialMedias
        if(firstname && !foundUser.verified) foundUser.firstname = firstname
        if(lastname && !foundUser.verified) foundUser.lastname = lastname
        if(melliCode && !foundUser.verified) foundUser.melliCode = melliCode
        if(bankShabaNumber && !foundUser.verified) foundUser.bankShabaNumber = bankShabaNumber
        if(bankCardNumber && !foundUser.verified) foundUser.bankCardNumber = bankCardNumber
        
    }catch(e){
        return res.status(500).json({ message: e.message });
    }
}

const changePassword = async(req ,res) => {

    const {oldPassword , newPassword} = req.body

    try{
        const foundUser = await User.findById(req._id)
        const match = await bcrypt.compare(foundUser.password , oldPassword)
        if(!match) return res.status(403).json({message:'old password is incorrect'})

        const hashedPwd = await bcrypt.hash(newPassword, 10);

        foundUser.password = hashedPwd

        await foundUser.save()

        return res.sendStatus(200)

    }catch(e){
        return res.status(500).json({ message: e.message });
    }
}


module.exports = {
    getAllUsers,
    deleteUser,
    getUser,
    updateUser, 
    changePassword
};
