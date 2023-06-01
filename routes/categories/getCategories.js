const router = require('express').Router()
const {getAllCategories} = require('../../controllers/categories/getCategoriesController')


/**
 * @swagger
 * /getcategories/all:
 *   get:
 *     summary: Get all categories
 *     tags:
 *       - getCategories
 *     description: Get all categories as an array
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error
 */
router.get('/all', getAllCategories)

module.exports = getAllCategories