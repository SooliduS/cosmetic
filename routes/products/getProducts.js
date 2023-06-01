const router = require('express').Router();
const {
    getAllProducts,
    getAmazingOfferProducts,
    getMostSalesProducts,
    getNewestProducts,
    getProduct,
} = require('../../controllers/products/getProductsController');

/**
 * @swagger
 * /getproducts/all:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - getProducts
 *     description: Get all products as an array
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
 *       - name: sort
 *         description: how to sort
 *         in: query
 *         schema:
 *           type: string
 *           enum: [mostSales , mostViews , mostExpensive , cheapest , newest]
 *       - name: offset
 *         description: the number of the starting item
 *         in: query
 *         schema:
 *           type: integer
 *       - name: limit
 *         description: number of items to send
 *         in: query
 *         schema:
 *           type: integer
 *       - name: categories
 *         description: list of ids of categories that need to search for (for subcategories just send a subcategory id alone) splited by "-"
 *         in: query
 *         schema: 
 *           type: string
 *           example: 645e325ba7c9a32759c2083a-645e325ba7c9a32759c2083a-645e325ba7c9a32759c2083a
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: All products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
router.get('/all', getAllProducts);

/**
 * @swagger
 * /getproducts/amazingoffers:
 *   get:
 *     summary: Get amazing offers
 *     tags:
 *       - getProducts
 *     description: Get amazing offers as an array
 *     parameters:
 *       - name: color
 *         description: Color of the product
 *         in: query
 *         schema:
 *           type: string
 *       - name: brand
 *         description: Brand of the product
 *         in: query
 *         schema:
 *           type: string
 *       - name: price
 *         description: Price range of the product
 *         in: query
 *         schema:
 *           type: string
 *         example: [645e325ba7c9a32759c2083a]
 *       - name: sort
 *         description: how to sort
 *         in: query
 *         schema:
 *           type: string
 *           enum: [mostSales , mostViews , mostExpensive , cheapest , newest]
 *       - name: offset
 *         description: the number of the starting item
 *         in: query
 *         schema:
 *           type: integer
 *       - name: limit
 *         description: number of items to send
 *         in: query
 *         schema:
 *           type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: amazing offers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
router.get('/amazingoffers', getAmazingOfferProducts);

/**
 * @swagger
 * /getproducts/mostSales:
 *   get:
 *     summary: Get mostSales products
 *     tags:
 *       - getProducts
 *     description: Get mostSales products as an array
 *     parameters:
 *       - name: color
 *         description: Color of the product
 *         in: query
 *         schema:
 *           type: string
 *       - name: brand
 *         description: Brand of the product
 *         in: query
 *         schema:
 *           type: string
 *       - name: price
 *         description: Price range of the product
 *         in: query
 *         schema:
 *           type: string
 *         example: [645e325ba7c9a32759c2083a]
 *       - name: sort
 *         description: how to sort
 *         in: query
 *         schema:
 *           type: string
 *           enum: [mostSales , mostViews , mostExpensive , cheapest , newest]
 *       - name: offset
 *         description: the number of the starting item
 *         in: query
 *         schema:
 *           type: integer
 *       - name: limit
 *         description: number of items to send
 *         in: query
 *         schema:
 *           type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: most sales products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
router.get('/mostSales', getMostSalesProducts);

/**
 * @swagger
 * /getproducts/newest:
 *   get:
 *     summary: Get newest products
 *     tags:
 *       - getProducts
 *     description: Get newest products as an array
 *     parameters:
 *       - name: color
 *         description: Color of the product
 *         in: query
 *         schema:
 *           type: string
 *       - name: brand
 *         description: Brand of the product
 *         in: query
 *         schema:
 *           type: string
 *       - name: price
 *         description: Price range of the product
 *         in: query
 *         schema:
 *           type: string
 *         example: [645e325ba7c9a32759c2083a]
 *       - name: sort
 *         description: how to sort
 *         in: query
 *         schema:
 *           type: string
 *           enum: [mostSales , mostViews , mostExpensive , cheapest , newest]
 *       - name: offset
 *         description: the number of the starting item
 *         in: query
 *         schema:
 *           type: integer
 *       - name: limit
 *         description: number of items to send
 *         in: query
 *         schema:
 *           type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: newest products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
router.get('/newest', getNewestProducts);

/**
 * @swagger
 * /getproducts/single/{slug}:
 *   get:
 *     summary: Get a single product by ID
 *     tags:
 *       - getProducts
 *     description: Get a single product by its ID
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The product object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get('/single/:slug', getProduct);

module.exports = router;
