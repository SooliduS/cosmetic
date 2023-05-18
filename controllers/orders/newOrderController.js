const Order = require('../../models/orderModel');
const User = require('../../models/userModel')

const newOrder = async (req, res) => {
    const { items, address, paymentMethod, aff_id } = req.body;
    // items:array of products 
    //address: {postalCode , detail , city , phoneNumber}
    //paymentMethod: enum:['idpay']
    //aff_id: id of user

    if(!items.length || paymentMethod || address) return res.status(400).json({message:'required fields needed'})
    if(!address.phoneNumber) return res.status(400).json({message:'phone number of address needed'})
    if(!address.detail) return res.status(400).json({message:'detail of address needed'})
    if(!address.city) return res.status(400).json({message:'city of address needed'})
    if(!address.postalCode) return res.status(400).json({message:'postalCode of address needed'})

    try{

        let affUser
        if(aff_id) {
            affUser = await User.findById(aff_id)
            
        }
    }catch(e){

    }
};
