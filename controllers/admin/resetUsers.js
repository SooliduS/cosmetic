const { getLastMonthSalesSum } = require('../../lib/getSalesmanDetails')
const User = require('../../models/userModel')

const resetUsers = async(req ,res)=> {
    try{
        const total = await User.countDocuments({'roles.salesman':1373})
        const allSalesmen = await User.find({'roles.salesman':1373})

        let count = 0
        await Promise.all(allSalesmen.map( async user => {
            count += 1
            console.log(`${count} of ${total} has been checked`);
            if(user.level === 1) {
                const lastMonthSalesSum = getLastMonthSalesSum(user._id)
                if(lastMonthSalesSum >= 3000000) user.level = 2
            }
            if(user.level === 2) {
                const lastMonthSalesSum = getLastMonthSalesSum(user._id)
                if(lastMonthSalesSum >= 6000000) user.level = 3
            }
            if(user.level === 3) {
                const lastMonthSalesSum = getLastMonthSalesSum(user._id)
                if(lastMonthSalesSum >= 10000000) user.level = 4
            }
            if(user.level === 4) {
                const lastMonthSalesSum = getLastMonthSalesSum(user._id)
                if(lastMonthSalesSum >= 15000000) user.level = 5
            }
            if(user.level === 5) {
                const lastMonthSalesSum = getLastMonthSalesSum(user._id)
                if(lastMonthSalesSum >= 30000000) user.level = 6
            }
            if(user.level === 6) {
                const lastMonthSalesSum = getLastMonthSalesSum(user._id)
                if(lastMonthSalesSum >= 100000000) {
                    const subordinatesCount = await User.countDocuments({level:{$gte:3} , superior:user._id})
                    if(subordinatesCount >= 5) user.level = 7
                }
            }
            if(user.level === 7) {
                const lastMonthSalesSum = getLastMonthSalesSum(user._id)
                if(lastMonthSalesSum >= 100000000) {
                    const subordinatesCount = await User.countDocuments({level:{$gte:6}, superior:user._id})
                    if(subordinatesCount >= 10) user.level = 8
                }
            }
            if(user.level === 8) {
                const lastMonthSalesSum = getLastMonthSalesSum(user._id)
                if(lastMonthSalesSum >= 100000000) {
                    const subordinatesCount = await User.countDocuments({level:{$gte:6}, superior:user._id})
                    if(subordinatesCount >= 20) user.level = 9
                }
            }
            if(user.level === 9) {
                const lastMonthSalesSum = getLastMonthSalesSum(user._id)
                if(lastMonthSalesSum >= 100000000) {
                    const subordinatesCount = await User.countDocuments({level:{$gte:6}, superior:user._id})
                    if(subordinatesCount >= 50) user.level = 10
                }
            }
          
            await user.save()


        }))
        return res.sendStatus(200)
        

    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

module.exports = resetUsers