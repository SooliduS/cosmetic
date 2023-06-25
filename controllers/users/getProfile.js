const User = require('../../models/userModel');
const Wallet = require('../../models/walletModel');

const getProfile = async (req, res) => {
    try {
        const profile = await User.findById(req._id).populate('wallet');

        if (!profile)
            return res.status(404).json({ message: 'user not found' });

        if (!profile?.wallet?._id)
            profile.wallet = await Wallet.create({ owner: req._id });

        const {
            username,
            firstname,
            lastname,
            email,
            accounNumber,
            isEmailConfirmed,
            phoneNumber,
            mobileNumber,
            isMobileNumberConfirmed,
            address,
            melliCode,
            isMelliCardConfimed,
            verified,
            active,
            instagram,
            socialMedias,
            level,
            superior,
            commissionPercentage,
            wallet,
            accountNumber
        } = profile;

        const roles = Object.values(profile.roles).filter(role => role != null);

        res.status(200).json({
            username,
            firstname,
            lastname,
            roles,
            email,
            accounNumber,
            isEmailConfirmed,
            phoneNumber,
            mobileNumber,
            isMobileNumberConfirmed,
            address,
            melliCode,
            isMelliCardConfimed,
            verified,
            active,
            instagram,
            socialMedias,
            level,
            superior,
            commissionPercentage,
            wallet,
            accountNumber,
        });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = { getProfile };
