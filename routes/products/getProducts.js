const router = require('express').Router();
const {
    getAllProducts,
    getAmazingOfferProducts,
    getMostSalesProducts,
    getNewestProducts,
    getProduct,
    getListOfProducts,
    getSalesmanProducts,
    getSimilarProducts,
} = require('../../controllers/products/getProductsController');
const verifyJWT = require('../../middlewares/verifyJWT');

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
 *       - name: searchName
 *         description: the search word that the products name include
 *         in: query
 *         type: string
 *         example: شامپو
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
 *       - name: searchName
 *         description: the search word that the products name include
 *         in: query
 *         type: string
 *         example: شامپو
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

/**
 * @swagger
 * /getproducts/list/{ids}:
 *   get:
 *     summary: Get a list of products by IDs
 *     tags:
 *       - getProducts
 *     parameters:
 *       - in: path
 *         name: ids
 *         schema:
 *           type: string
 *         required: true
 *         description: IDs of the products (dash-separated)
 *         example: lhiwufhowuefwhef0-ijsfohoufhweufwf-oiwofwneofwnwf
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductListResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               message: An error occurred while retrieving the products.
 *
 * components:
 *   schemas:
 *     ProductListResponse:
 *       type: object
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         total:
 *           type: number
 *
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *         brand:
 *           type: string
 *         createdAt:
 *           type: string
 *         updatedAt:
 *           type: string
 */
router.get('/list/:ids', getListOfProducts);

/**
 * @swagger
 * /getproducts/salesman:
 *   get:
 *     summary: Get products for salesman to sale
 *     tags:
 *       - getProducts
 *     description: Get products for salesman to sale
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
 *       - name: searchName
 *         description: the search word that the products name include
 *         in: query
 *         type: string
 *         example: شامپو
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: to sale products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 */
router.get('/salesman', verifyJWT, getSalesmanProducts);

/**
 * @swagger
 * /getproducts/similar/{slug}:
 *   get:
 *     summary: Get similar products
 *     tags:
 *       - getProducts
 *     description: Retrieve similar products based on shared tags with a given product.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         description: The slug of the product to find similar products for.
 *         schema:
 *           type: string
 *       - name: offset
 *         in: query
 *         description: The number of products to skip in the result.
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: The maximum number of products to return.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successful operation
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Product'
 *       '400':
 *         description: Invalid request parameters
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '500':
 *         description: Internal server error
 *
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       price:
 *         type: number
 *       category:
 *         type: string
 *       tags:
 *         type: array
 *         items:
 *           type: string
 *       createdAt:
 *         type: string
 *       updatedAt:
 *         type: string
 */
router.get('/similar/:slug', getSimilarProducts);

module.exports = router;
