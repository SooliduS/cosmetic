const USER_ROLES_LIST = require('../config/userRolesList')

const verifyAdmin = (req, res, next) => {
  if(!req.roles) return res.sendStatus(401)

  if(!req.roles.includes(USER_ROLES_LIST.Admin)) return res.status(403).json({message:'admin only private route'})

  next()
}

module.exports = verifyAdmin