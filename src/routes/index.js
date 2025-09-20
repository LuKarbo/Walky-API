const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: '🚶‍♂️ Bienvenido a WalkyAPI',
        version: '1.0.0',
        endpoints: {
            auth: {
                register: 'POST /api/auth/register',
                login: 'POST /api/auth/login',
                verify: 'GET /api/auth/verify (requiere token)'
            },
            users: {
                getAll: 'GET /api/users (requiere token)',
                getById: 'GET /api/users/:id (requiere token)',
                update: 'PUT /api/users/:id (requiere token)',
                delete: 'DELETE /api/users/:id (requiere token)'
            }
        }
    });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;