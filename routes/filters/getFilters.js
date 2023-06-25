const {getFilters} = require('../../controllers/filters/getBrandAndColorController')
const router = require('express').Router()

/**
 * @swagger
 * /getfilters:
 *   get:
 *     summary: Get brands and colors for product filters
 *     tags:
 *       - getFilters
 *     parameters:
 *       - name: categories
 *         description: list of ids of categories that need to search for (for subcategories just send a subcategory id alone) splited by "-"
 *         in: query
 *         schema: 
 *           type: string
 *           example: 645e325ba7c9a32759c2083a-645e325ba7c9a32759c2083a-645e325ba7c9a32759c2083a
 *       - name: searchName
 *         description: the search word that the products name include
 *         in: query
 *         type: string
 *         example: شامپو
 *     responses:
 *       '200':
 *         description: Brands and colors retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 colors:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The available colors for product filtering.
 *                 brands:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: The available brands for product filtering.
 *       '500':
 *         description: An error occurred while retrieving brands and colors.
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while retrieving brands and colors.
 */
router.get('/' , getFilters)

module.exports = router