const router = require('express').Router()
const { getAllProducts , getAmazingOfferProducts , getMostSalesProducts , getNewestProducts , getProduct } = require('../../controllers/products/getProductsController')

/**
 * @swagger
 * /getproducts/all:
 *   get:
 *     summary: get all products product
 *     tags: [Get Products]
 */
router.get('/all' , getAllProducts)

/**
 * @swagger
 * /getproducts/amaizingoffers:
 *   get:
 *     summary: get products in amazing offer
 *     tags: [GetProducts]
 */
router.get('/amazingOffers' , getAmazingOfferProducts)

/**
 * @swagger
 * /getproducts/mostsales:
 *   get:
 *     summary: get most sales products
 *     tags: [GetProducts]
 */
router.get('/mostSales', getMostSalesProducts)

/**
 * @swagger
 * /getproducts/newest:
 *   get:
 *     summary: get newest products
 *     tags: [GetProducts]
 */
router.get('/newest' , getNewestProducts)

/**
 * @swagger
 * /products/single/{id}:
 *   get:
 *     summary: Get a single product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: string
 */
router.get('/single/:id' , getProduct)

module.exports = router