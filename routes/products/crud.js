const express = require('express');
const router = express.Router();
const {addProduct} = require('../../controllers/products/addProductController');
const {editProduct} = require('../../controllers/products/editProductController')


router.post('/', addProduct);

/**
 * @swagger
 * /product:
 *   put:
 *     summary: Edit an exiting product
 *     tags: [Products]
 *     consumers:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: productId
 *         in: body
 *         required: true
 *         description: id of the product that we want to edit
 *       - name: name
 *         in: body
 *         required: true
 *         description: name or title of the product
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
 *       '200':
 *         description: The product updated succesfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '400':
 *         description: Invalid request body
 *       '500':
 *         description: Internal server error
 */
router.put('/' , editProduct )

module.exports = router;