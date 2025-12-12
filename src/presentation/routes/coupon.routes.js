const { Router } = require('express');
const CouponController = require('../controller/coupon.controller');
const CouponService = require('../../application/use-cases/coupon.service');
const CouponMongoRepository = require('../../infrastructure/repositories/database/mongo/coupon.mongo.repository');
const asyncHandler = require('../utils/async.handler');

const couponRepository = new CouponMongoRepository();
const couponService = new CouponService(couponRepository);
const couponController = new CouponController(couponService);

const authenticateToken = require('../middlewares/auth.miffleware'); // coincide con el nombre real
const isAdmin = require('../middlewares/admin.middleware');


const router = Router();

// Rutas públicas (consultas)
/**
 * @swagger
 * /coupons:
 *   get:
 *     tags:
 *       - Coupons
 *     summary: Retrieve a list of Coupons
 *     responses:
 *       200:
 *         description: A list of Coupons.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coupon'
 */
router.get('/', asyncHandler(couponController.getAll));

/**
 * @swagger
 * /coupons/{id}:
 *   get:
 *     tags:
 *       - Coupons
 *     summary: Retrieve a single coupon by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single coupon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       404:
 *         description: coupon not found
 */
router.get('/:id', asyncHandler(couponController.getById));


//!! Rutas protegidas solo admin

/**
 * @swagger
 * /Coupons:
 *   post:
 *     tags:
 *       - Coupons
 *     summary: Create a new coupon
 *     description: Requires authentication token and role *admin*
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CouponInput'
 *     responses:
 *       201:
 *         description: The created coupon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Bad request
 *       401:
 *        description: No token provided, authorization denied
 *       403:
 *        description: Access denied. Admin role required.
 *       409:
 *         description: Coupon with this code already exists
 */

router.post('/', authenticateToken, isAdmin, asyncHandler(couponController.create));

/**
 * @swagger
 * /coupons/{id}:
 *   put:
 *     tags:
 *       - Coupons
 *     summary: Update a coupon
*     description: Requires authentication token and role *admin*
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CouponInput'
 *     responses:
 *       200:
 *         description: The updated coupon.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coupon'
 *       400:
 *         description: Bad request
 *       401:
 *        description: No token provided, authorization denied
 *       403:
 *        description: Access denied. Admin role required.
 *       404:
 *         description: Coupon not found
 *       409:
 *         description: Coupon with this code already exists
 */
router.put('/:id', authenticateToken, isAdmin, asyncHandler(couponController.update));

/**
 * @swagger
 * /coupons/{id}:
 *   delete:
 *     summary: Delete a coupon
 *     tags:
 *       - Coupons
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: User not found
 */
router.delete('/:id', authenticateToken, isAdmin, asyncHandler(couponController.delete));

module.exports = router;
