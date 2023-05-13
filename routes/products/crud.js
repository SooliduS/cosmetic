const express = require('express');
const router = express.Router();
const {addProduct} = require('../../controllers/products/addProductController');

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     parameters:
 *       - name: name
 *         in: body
 *         required: true
 *         description: name or title of the product
 *         schema:
 *           type: string
 *       - name: slug
 *         description: uniqe slug for the product address (not required)
 *         in: body
 *         schema:
 *           type: string
 *       - name: categories
 *         in: body
 *         schema: 
 *           type: array
 *         description: array of ids of categories(parent and children)
 *       - name : price
 *         in: body
 *         schema:
 *           type: integer
 *       - name: brand
 *         in: body
 *         schema:
 *           type: string
 *       - name: color
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             - name: rgb
 *               type: string
 *               example: (255 , 255 , 255)
 *             - name: hex
 *               type: string
 *               example: #e1e1e1
 *             - name: name
 *               example: blue
 *       - name: images
 *         in: body
 *         description: array of addresses of the images uploaded to cloudinary
 *         schema: 
 *           type: array
 *       - name: tags
 *         in: body
 *         description: tags
 *         schema:
 *           type: array
 *         example: ['shampoo' , 'head and shoulders']
 *       - name: details
 *         in: body
 *         description: array of key and values for details of a product
 *         example: [{key:'made in' , value: 'iran'} , {key: 'type' , value: 'for natural hair'}]
 *         schema:
 *           type: array
 *       - name: description
 *         in: body
 *         description: description of product
 *         schema:
 *           type: string
 *       - name: inventory
 *         in: body
 *         description: number of product that left for sale(موجودی)
 *     responses:
 *       '201':
 *         description: A new product has been created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 */
router.post('/create', addProduct);

module.exports = router;