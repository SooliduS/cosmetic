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

           foundUser.phoneNumber = phoneNumber
           foundUser.melliCardImg = melliCardImg
           foundUser.melliCode = melliCode
           foundUser.bankCardNumber = bankCardNumber
           foundUser.bankShabaNumber = bankShabaNumber
           foundUser.instagram = instagram
           foundUser.address = address
           foundUser.mobileNumber = mobileNumber
           foundUser.email = email

        const user = await foundUser.save();

        const newSalesmanRequest = await SalesmanRequest.create({
            user: foundUser._id,
        });

        return res
            .status(200)
            .json({
                newSalesmanRequest
            });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getSalesmanRequest = async(req , res) => {
    try{
        const request = await SalesmanRequest.findOne({user:req._id})

        if( !request ) return res.sendStatus(404)

        console.log(request);
        res.status(200).json(request)
    }catch(e){
        res.status(500).json({message:e.message})
    }
}

module.exports = { becomeSalesman , getSalesmanRequest };
