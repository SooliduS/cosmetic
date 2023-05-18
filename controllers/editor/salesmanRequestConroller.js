const SalesmanRequest = require('../../models/salesmanRequest');
const User = require('../../models/userModel')

const getSalesmanRequests = async (req, res) => {
    try {
        const requests = await SalesmanRequest.find({
            confirmed: false,
            adminUpdateDate: { $lt: '$updatedAt' },
        }).sort('updatedAt');

        return res.status(200).json(requests)
    } catch (e) {
        return res.sendStatus(500)
    }
};

const handleSalesmanRequest = async (req ,res) => {

    const {message , requstId , confirmed , products} = req.body //confirmed:boolean  products:array of product ids

    if(!requstId) return res.status(400).json({message:'request id needed'})
    if(!message) return res.status(400).josn({message:'message needed'})

    try{

        const foundReq = await SalesmanRequest.findById(requstId)
        if(!foundReq) return res.status(404).json({message:'request not found'})

        foundReq.message = message
        foundReq.confirmed = confirmed
        await foundReq.save()

        if(confirmed) {
            const foundUser = await User.findById(foundReq.user)
            if(!foundUser) return res.status(404).json({message:'user not found'})

            foundUser.roles.Salesman = 1373
            foundUser.productsForSale = products

            await foundUser.save()
        }

        return res.status(200).json(foundReq)

    }catch(e){
        return res.sendStatus(500)
    }
}
module.exports = {getSalesmanRequests , handleSalesmanRequest}