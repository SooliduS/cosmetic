const Order = require('../../models/orderModel');
const filterOrders = require('../../lib/filterOrders');

const getOrders = async (req, res) => {

    const { offset, limit } = req.query;
    const { sort, filter } = filterOrders(req);

    try {
        const total = await Order.countDocuments({...filter , status:{$gte:2}})
        const orders = await Order.find({...filter , status:{$gte:2}}).populate('items.product')
            .sort(sort)
            .skip(Number(offset))
            .limit(Number(limit));

            return res.status(200).json({orders , total})
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getOrdersByUser = async(req ,res) => {
    const {offset , limit} = req.query
    const {sort , filter} = filterOrders(req)

    const buyer = req.params?.id || req._id
    try{
        const orders = await Order.find({buyer  , ...filter , status:{$gte:2}} ,{seen:0}).populate('items.product').sort(sort).skip(Number(offset)).limit(Number(limit))
        const total = await Order.countDocuments({buyer  , ...filter , status:{$gte:2}} )

        return res.status(200).json({orders , total})
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const getSingleOrder = async( req ,res ) => {
    const {orderId} = req.params
    if(!orderId) return res.status(400).json({message:'order id needed'})

    const order = await Order.findById(orderId).populate('items.product').populate('buyer' , 'username firstname lastname phoneNumber mobileNumber')

    if(!order) return res.sendStatus(404)

    //admin seen
    if(req.roles.includes(1344) || req.roles.includes(1346))
    {
        order.seen = true
        await order.save()
    }
    //only the user who makes order and admin can get this order
    if(!req.roles.includes(1344) && !req.roles.includes(1346) && order.buyer._id != req._id) return res.sendStatus(403)

    return res.status(200).json(order)
}

module.exports = {getOrders , getOrdersByUser , getSingleOrder}