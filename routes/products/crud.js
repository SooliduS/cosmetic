const express = require('express');
const router = express.Router();
const {addProduct} = require('../../controllers/products/addProductController');

/**
 * @swagger
 * /products/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       description: The product to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *             components:
 *               categories:
 *                 type:array
 *                 desciption:id of categories
 *                 example:['ido1210821r112er' , 'wfiwjefow938123e2'] 
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