const express = require('express');
const router = express.Router();
const {addProduct} = require('../../controllers/products/addProductController');
const {editProduct} = require('../../controllers/products/editProductController')
const {deleteProduct} = require('../../controllers/products/deleteProductController')
const {addToAmaizingOffer} = require('../../controllers/products/addToAmaizingOffersController')


/**
 * @swagger
 * /product/edit/{slug}:
 *   put:
 *     summary: Edit product
 *     tags:
 *       - Product
 *     description: Edit an existing product by providing its slug and updated information.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: slug
 *         in: path
 *         required: true
 *         description: The slug of the product to edit.
 *         schema:
 *           type: string
 *       - name: body
 *         in: body
 *         description: Updated information for the product.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ProductEditInput'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/Product'
 *       '400':
 *         description: Invalid request parameters
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '404':
 *         description: Product not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       '500':
 *         description: Internal server error
 *
 * definitions:
 *   ProductEditInput:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       slug:
 *         type: string
 *       category:
 *         type: string
 *       price:
 *         type: number
 *       discount:
 *         type: number
 *       isSuggested:
 *         type: boolean
 *       brand:
 *         type: string
 *       colors:
 *         type: array
 *         items:
 *           type: string
 *       images:
 *         type: array
 *         items:
 *           type: string
 *       shippingClasses:
 *         type: array
 *         items:
 *           type: string
 *       tags:
 *         type: array
 *         items:
 *           type: string
 *       details:
 *         type: string
 *       description:
 *         type: string
 *       inventory:
 *         type: number
 *       englishName:
 *         type: string
 *       brief:
 *         type: string
 *
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
router.put('/edit/:slug' , editProduct )

/**
 * @swagger
 * /product/delete/{slug}:
 *   delete:
 *     tags:
 *      - Product
 *      - Admin
 *     summary: Delete a product (admin only)
 *     description: Deletes a product with the provided ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       202:
 *         description: Successful operation
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       400:
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       404:
 *         description: Product not found
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Internal server error
 *
 */
router.delete('/delete/:slug' , deleteProduct)

 /**
 * @swagger
 * /product/add:
 *   post:
 *     summary: Add product
 *     tags:
 *       - Product
 *     description: Add a new product.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         description: Information of the product to add.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ProductInput'
 *     responses:
 *       '201':
 *         description: Product created successfully
 *         schema:
 *           $ref: '#/definitions/Product'
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
 *   ProductInput:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: The name of the product.
 *       slug:
 *         type: string
 *         description: The slug of the product.
 *       category:
 *         type: string
 *         description: The category of the product.
 *       price:
 *         type: number
 *         description: The price of the product.
 *       brand:
 *         type: string
 *         description: The brand of the product.
 *       colors:
 *         type: array
 *         items:
 *           $ref: '#/definitions/ColorInput'
 *         description: The colors available for the product.
 *       images:
 *         type: array
 *         items:
 *           type: string
 *         description: The images of the product.
 *       tags:
 *         type: array
 *         items:
 *           type: string
 *         description: The tags associated with the product.
 *       description:
 *         type: string
 *         description: The description of the product.
 *       inventory:
 *         type: number
 *         description: The inventory count of the product.
 *       level:
 *         type: number
 *         description: The level of the product.
 *       details:
 *         type: string
 *         description: The details of the product.
 *       englishName:
 *         type: string
 *         description: The English name of the product.
 *       brief:
 *         type: string
 *         description: A brief description of the product.
 *
 *   ColorInput:
 *     type: object
 *     properties:
 *       rgb:
 *         type: string
 *         description: The RGB value of the color.
 *       hex:
 *         type: string
 *         description: The HEX value of the color.
 *       name:
 *         type: string
 *         description: The name of the color.
 *
 *   Product:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *         description: The ID of the product.
 *       name:
 *         type: string
 *         description: The name of the product.
 *       description:
 *         type: string
 *         description: The description of the product.
 *       price:
 *         type: number
 *         description: The price of the product.
 *       category:
 *         type: string
 *         description: The category of the product.
 *       tags:
 *         type: array
 *         items:
 *           type: string
 *         description: The tags associated with the product.
 *       createdAt:
 *         type: string
 *         description: The timestamp of when the product was created.
 *       updatedAt:
 *         type: string
 *         description: The timestamp of when the product was last updated.
 */
router.post('/add', addProduct);

/**
 * @swagger
 * /product/amazingoffers: 
 *   tags:
 *     - Product
 *   post:
 *     summary: Add products to the amazing offer list
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               slugs:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ['product1', 'product2']
 *               expirationDate:
 *                 type: string
 *                 format: date
 *                 example: '2023-12-31'
 *     responses:
 *       '200':
 *         description: Products added to amazing offer successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
router.post('/amazingoffers' , addToAmaizingOffer)





module.exports = router;