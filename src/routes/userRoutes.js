const express = require('express');
const UserController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Todas las rutas de usuarios requieren autenticación
router.use(authenticateToken);

router.get('/', UserController.getAllUsers);
router.get('/stats', UserController.getUserStats);
router.get('/search', UserController.searchUsers);
router.get('/:id', UserController.getUserById);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

router.patch('/:id/status', UserController.changeUserStatus);

module.exports = router;