const User = require('../../models/userModel');
const SalesmanRequest = require('../../models/salesmanRequest');

const becomeSalesman = async (req, res) => {
    const {
        melliCode,
        email,
        phoneNumber,
        address,
        mobileNumber,
        melliCardImg,
        bankCardNumber,
        bankShabaNumber,
        instagram,
    } = req.body;

    if (
        !melliCode ||
        !email ||
        !phoneNumber ||
        !address ||
        !mobileNumber ||
        !melliCardImg ||
        !instagram ||
        !bankCardNumber ||
        !bankShabaNumber
    )
        return res
            .status(400)
            .json({ message: 'please fill all required fields' });
    try {
        const foundUser = await User.findById(req._id);

        if(!foundUser) return res.status(400).josn({message:'user not found'})

        // update found user , make sure some not editable contant not beeng edited
        foundUser = {
            ...req.body,
            username: foundUser.username,
            roles: foundUser.roles,
            password: foundUser.password,
            email: foundUser.email,
            isEmailConfirmed: foundUser.isEmailConfirmed,
            isMobileNumberConfirmed: foundUser.isMobileNumberConfirmed,
            isMelliCardConfirmed: foundUser.isMelliCardConfirmed,
            verified: foundUser.verified,
            level: foundUser.level,
            productsForSale: foundUser.productsForSale,
            wallet: foundUser.wallet,
        };
        const user = await foundUser.save();

        const newSalesmanRequest = await SalesmanRequest.create({
            user: foundUser._id,
        });

        return res
            .status(200)
            .json({
                message: `user ${foundUser.username} updated successfully`,
                user,
            });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getSalesmanRequest = async(req , res) => {
    try{
        const request = await SalesmanRequest.findOne({user:req._id})

        console.log(request);
        res.status(200).json(request)
    }catch(e){
        res.status(500).json({message:e.message})
    }
}

module.exports = { becomeSalesman , getSalesmanRequest };
