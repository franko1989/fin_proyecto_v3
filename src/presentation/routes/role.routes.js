const { Router } = require('express');
const RoleController = require('../controller/role.controller');
const RoleService = require('../../application/use-cases/role.service');
const RoleMongoRepository = require('../../infrastructure/repositories/database/mongo/role.mongo.repository');
const asyncHandler = require('../utils/async.handler');

const authenticateToken = require('../middlewares/auth.miffleware');
const isAdmin = require('../middlewares/admin.middleware');

const roleRepository = new RoleMongoRepository();
const roleService = new RoleService(roleRepository);
const roleController = new RoleController(roleService);

const router = Router();

// RUTAS ABIERTAS
router.get('/', asyncHandler(roleController.getAll));
router.get('/:id', asyncHandler(roleController.getById));

// RUTAS RESTRINGIDAS SOLO PARA ADMIN
//router.post('/', authenticateToken, isAdmin, asyncHandler(roleController.create));
router.post('/', authenticateToken, isAdmin, asyncHandler(roleController.create));
router.put('/:id', authenticateToken, isAdmin, asyncHandler(roleController.update));
router.delete('/:id', authenticateToken, isAdmin, asyncHandler(roleController.delete));

module.exports = router;
