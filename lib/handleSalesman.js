const User = require('../models/userModel');

const handleSalesman = async (req) => {
    try {
        const foundUser = await User.findById(req.body.aff_id || req._id);
        if(!foundUser) return next()

        const roles = Object.keys(foundUser.roles)
        if(!roles.includes('Salesman')) return next()

        const level =  foundUser.level

        if ( level === 0 ) {

        }
    } catch (e) {
        next();
    }
};
