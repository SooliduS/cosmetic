const TopBanner = require('../../models/topBanner');

const addTopBanner = async (req, res) => {
    const { image, url, sortOrder, expirationDate } = req.body;

    console.log('salam');
    if (!image || !url || !expirationDate)
        return res.status(400).json({
            message: 'image , url , expirationDate needed'
        });
    try {
        const banners = await TopBanner.find({
            sortOrder: { $gte: sortOrder },
        }).sort({sortOrder:1});
        console.log('0');
        const match = banners.find((banner) => banner.sortOrder === sortOrder);
        console.log(match);
        if (banners.length && match) {
            let count = 0
            await Promise.all(
                banners.map(async (banner) => {
                    if (banner.sortOrder) banner.sortOrder = sortOrder + (banners.length - count);
                    console.log(banner.sortOrder);
                    count += 1
                    await banner.save();
                })
            );
        }

        console.log('2');
        const newTopBanner = await TopBanner.create({
            image,
            url,
            sortOrder,
            expirationDate,
        });
        return res.status(201).json(newTopBanner);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const editTopBanners = async (req, res) => {
    const items = req.body;
    try {
        await Promise.all(
            items.map(async (item) => {
                const foundItem = await TopBanner.findById(item._id);
                if (!foundItem) return res.sendStatus(404);

                if (item.image) foundItem.image = item.image;
                if (item.url) foundItem.url = item.url;
                if (item.expirationDate)
                    foundItem.expirationDate = item.expirationDate;
                if (item.sortOrder) foundItem.sortOrder = item.sortOrder;

                await foundItem.save();

                return res.sendStatus(200);
            })
        );
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const deleteTopBanners = async (req, res) => {
    const ids = req.body;
    try {
        await Promise.all(
            ids.map(async (id) => {
                const foundItem = await TopBanner.findByIdAndDelete(id);
                return res.sendStatus(200);
            })
        );
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getTopBanners = async (req, res) => {
    const { offset, limit } = req.query;
    try {
        const topBanners = await TopBanner.find()
            .skip(Number(offset))
            .limit(Number(limit))
            .sort({ sortOrder: -1 });
        return res
            .status(200)
            .json({ banners: topBanners, total: topBanners.length });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};
module.exports = {
    addTopBanner,
    editTopBanners,
    deleteTopBanners,
    getTopBanners,
};
