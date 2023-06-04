const {getBrandsAndColors} = require('../../controllers/filters/getBrandAndColorController')
const router = require('express').Router()

/**
 * @swagger
 * /getfilters:
 *   get:
 *     summary: Get brands and colors for product filters
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: The filter to apply on products.
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
router.get('/getfilters' , getBrandsAndColors)

module.exports = router