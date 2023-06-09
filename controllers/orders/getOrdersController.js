const Order = require('../../models/orderModel');
const filterOrders = require('../../lib/filterOrders');

const getOrders = async (req, res) => {

    const { offset, limit } = req.query;
    const { sort, filter } = filterOrders(req);

    try {
        const total = await Order.countDocuments(filter)
        const orders = await Order.find(filter)
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
        const orders = await Order.find({buyer  , ...filter} ,{seen:0}).sort(sort).skip(Number(offset)).limit(Number(limit))

        return res.status(200).json(orders)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const getSingleOrder = async( req ,res ) => {
    const {orderId} = req.params
    if(!orderId) return res.status(400).json({message:'order id needed'})

    const order = await Order.findById(orderId)

    if(!order) return res.sendStatus(404)

    if(req.roles.includes(1344) || req.roles.includes(1346))
    {
        order.seen = true
        await order.save()
    }

    if(!req.roles.includes(1344) && !req.roles.includes(1346) && order.buyer != req._id) return res.sendStatus(403)

    return res.status(200).json(order)
}

module.exports = {getOrders , getOrdersByUser , getSingleOrder}