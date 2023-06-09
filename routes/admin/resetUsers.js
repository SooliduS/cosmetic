const router = require('express').Router()
const resetUsers = require('../../controllers/admin/resetUsers')

router.get('/' , resetUsers)

module.exports = router