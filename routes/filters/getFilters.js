const {getBrandsAndColors} = require('../../controllers/filters/getBrandAndColorController')
const router = require('express').Router()

/**
 * @swagger
 * /getfilters:
 *   get:
 *     summary: Get brands and colors for product filters
 *     tags:
 *       - getFilters
 *     parameters:
 *       - name: colors
 *         description: list of color names of the products splited by "-"
 *         in: query
 *         example: آبی-سفید-صورتی
 *         schema:
 *           type: string
 *       - name: brands
 *         description: list of Brands of the products splited by "-"
 *         in: query
 *         example: oreal-nike-golrang
 *         schema:
 *           type: string
 *       - name: price
 *         description: Price range of the product
 *         in: query
 *         schema:
 *           type: string
 *         example: 100000-200000
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
router.get('/' , getBrandsAndColors)

module.exports = router