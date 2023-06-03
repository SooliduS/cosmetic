const express = require('express');
const router = express.Router();
const {addProduct} = require('../../controllers/products/addProductController');
const {editProduct} = require('../../controllers/products/editProductController')
const {deleteProduct} = require('../../controllers/products/deleteProductController')

/**
 * @swagger
 * /product:
 *   post:
 *     tags: 
 *       - Product
 *       - Admin
 *     summary: Add a new product (admin only)
 *     description: Creates a new product with the provided information.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ProductInput'
 *     responses:
 *       201:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/Product'
 *       400:
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *
 * definitions:
 *   ProductInput:
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
 *       brand:
 *         type: string
 *       colors:
 *         $ref: '#/definitions/ColorInput'
 *       images:
 *         type: array
 *         items:
 *           type: string
 *       level:
 *         type: number
 *       tags:
 *         type: array
 *         items:
 *           type: string
 *       details:
 *         schema: 
 *           type: array
 *         items: 
 *           type: object
 *           properties:
 *               key:
 *                 type: string
 *                 example: 'made in'
 *               value:
 *                 type: string
 *                 example: iran
 *       description:
 *         type: string
 *       inventory:
 *         type: number
 *
 *   ColorInput:
 *     type: array
 *     items:
 *       type: object
 *       properties:
 *         rgb:
 *           type: string
 *         hex:
 *           type: string
 *         name:
 *           type: string
 *
 *   Product:
 *     allOf:
 *       - $ref: '#/definitions/ProductInput'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 *           comments:
 *             type: array
 *             items:
 *               type: object
 *           rating:
 *             type: number
 *           ordersCount:
 *             type: number
 */
router.post('/', addProduct);

/**
 * @swagger
 * /product/{slug}:
 *   put:
 *     tags: 
 *       - Product
 *       - Admin
 *     summary: Edit a product product (admin only)
 *     description: Edit a product with the provided information.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: slug
 *         in: path
 *         description: ID of the product to retrieve
 *         required: true
 *         schema:
 *           type: string
 *       - name: body
 *         description: Product object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/ProductInput'
 *     responses:
 *       201:
 *         description: Successful operation
 *         schema:
 *           $ref: '#/definitions/Product'
 *       400:
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *
 * definitions:
 *   ProductInput:
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
 *       brand:
 *         type: string
 *       colors:
 *         $ref: '#/definitions/ColorInput'
 *       images:
 *         type: array
 *         items:
 *           type: string
 *       level:
 *         type: number
 *       tags:
 *         type: array
 *         items:
 *           type: string
 *       details:
 *         schema: 
 *           type: array
 *         items: 
 *           type: object
 *           properties:
 *               key:
 *                 type: string
 *                 example: 'made in'
 *               value:
 *                 type: string
 *                 example: iran
 *       description:
 *         type: string
 *       inventory:
 *         type: number
 *
 *   ColorInput:
 *     type: array
 *     items:
 *       type: object
 *       properties:
 *         rgb:
 *           type: string
 *         hex:
 *           type: string
 *         name:
 *           type: string
 *
 *   Product:
 *     allOf:
 *       - $ref: '#/definitions/ProductInput'
 *       - type: object
 *         properties:
 *           _id:
 *             type: string
 *           comments:
 *             type: array
 *             items:
 *               type: object
 *           rating:
 *             type: number
 *           ordersCount:
 *             type: number
 */
router.put('/' , editProduct )

/**
 * @swagger
 * /product:
 *   delete:
 *     tags:
 *      - Product
 *      - Admin
 *     summary: Delete a product (admin only)
 *     description: Deletes a product with the provided ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: Product ID object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/DeleteProductInput'
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
 * definitions:
 *   DeleteProductInput:
 *     type: object
 *     properties:
 *       productId:
 *         type: string
 */
router.delete('/' , deleteProduct)

module.exports = router;