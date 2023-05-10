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
 *       - GetProducts
 *     description: Get all products as an array
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
 *     summary: Get amazing offers products
 *     tags:
 *       - GetProducts
 *     description: Get amazing offers products as an array
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: amazing offers products
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
 *       - GetProducts
 *     description: Get mostSales products as an array
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
 *       - GetProducts
 *     description: Get newest products as an array
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
 * /getproducts/single/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     tags:
 *       - GetProducts
 *     description: Get a single product by its ID
 *     parameters:
 *       - name: id
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
router.get('/single/:id', getProduct);


module.exports = router;
