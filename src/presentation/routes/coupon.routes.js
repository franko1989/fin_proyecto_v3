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
router.get('/', asyncHandler(couponController.getAll));
router.get('/:id', asyncHandler(couponController.getById));

// Rutas protegidas solo admin
router.post('/', authenticateToken, isAdmin, asyncHandler(couponController.create));
router.put('/:id', authenticateToken, isAdmin, asyncHandler(couponController.update));
router.delete('/:id', authenticateToken, isAdmin, asyncHandler(couponController.delete));

module.exports = router;
