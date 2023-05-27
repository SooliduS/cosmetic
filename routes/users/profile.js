const router = require('express').Router()
const {getProfile} = require('../../controllers/users/getProfile')

router.get('/' , getProfile)

module.exports = router