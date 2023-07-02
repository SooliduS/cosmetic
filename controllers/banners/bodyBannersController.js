const BodyBanner = require('../../models/bodyBanner')

const addBodyBanner = async (req , res)=> {
    const {items , expirationDate} = req.body

    try{
        items.map(item => {
            if(!item.url || !item.image || !item.title) throw new Error('item.url , item.image , item.title needed')
        })

        const newBodyBanner = await BodyBanner.create({
            items,
            expirationDate
        })
    }catch(e){
        if(e.message === 'item.url , item.image , item.title needed') return res.status(400).json({message:e.message})
        return res.status(500).json({message:e.message})
    }
}

const editBodyBanner = async (req , res) => {
    const {_id , items , expiratonDate} = req.body

    try{
        const foundBanner = await BodyBanner.findById(_id)
        if(items?.length) foundBanner.items = items
        if(expiratonDate) foundBanner.expirationDate = expiratonDate

        const savedBanner = await foundBanner.save()

        return res.status(200).json(savedBanner)
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const deleteBodyBanners = async( req , res ) => {
    const {ids} = req.body

    try{
        await BodyBanner.deleteMany({_id:ids})
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const getAllBodyBanners = async( req ,res ) => {
    const {limit , offset} = req.query
    try{
        const banners = await BodyBanner.find().skip(Number(offset)).limit(Number(limit))

        return res.status(200).json({banners , total:banners.length})
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

const getRandomBodyBanners = async( req ,res ) =>{
    try{
        const banners = await BodyBanner.aggregate([{$sample:{size:2}}])

        return res.status(200).json({message:banners})
    }catch(e){
        return res.status(500).json({message:e.message})
    }
}

module.exports = {addBodyBanner , editBodyBanner , deleteBodyBanners , getAllBodyBanners , getRandomBodyBanners }