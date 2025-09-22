const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Bienvenido a WalkyAPI',
        version: '1.0.0',
        documentation: {
            auth: {
                register: {
                    method: 'POST',
                    endpoint: '/api/auth/register',
                    description: 'Registrar nuevo usuario',
                    body: {
                        name: 'string (requerido)',
                        email: 'string (requerido)',
                        password: 'string (min 6 caracteres, requerido)',
                        phone: 'string (opcional)',
                        location: 'string (opcional)',
                        role: 'string (opcional, default: client)'
                    }
                },
                login: {
                    method: 'POST',
                    endpoint: '/api/auth/login',
                    description: 'Iniciar sesión',
                    body: {
                        email: 'string (requerido)',
                        password: 'string (requerido)'
                    }
                },
                checkSession: {
                    method: 'POST',
                    endpoint: '/api/auth/check-session',
                    description: 'Verificar sesión activa',
                    headers: {
                        Authorization: 'Bearer {token}'
                    }
                },
                verify: {
                    method: 'GET',
                    endpoint: '/api/auth/verify',
                    description: 'Verificar token válido',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                logout: {
                    method: 'POST',
                    endpoint: '/api/auth/logout',
                    description: 'Cerrar sesión',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                refreshToken: {
                    method: 'POST',
                    endpoint: '/api/auth/refresh-token',
                    description: 'Renovar token JWT',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                }
            },
            users: {
                getAll: {
                    method: 'GET',
                    endpoint: '/api/users',
                    description: 'Obtener todos los usuarios',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                getById: {
                    method: 'GET',
                    endpoint: '/api/users/:id',
                    description: 'Obtener usuario por ID',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                update: {
                    method: 'PUT',
                    endpoint: '/api/users/:id',
                    description: 'Actualizar usuario',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        name: 'string (opcional)',
                        email: 'string (opcional)',
                        password: 'string (opcional, min 6 caracteres)',
                        phone: 'string (opcional)',
                        location: 'string (opcional)',
                        profileImage: 'string (opcional)'
                    }
                },
                delete: {
                    method: 'DELETE',
                    endpoint: '/api/users/:id',
                    description: 'Eliminar usuario (soft delete)',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                getStats: {
                    method: 'GET',
                    endpoint: '/api/users/stats',
                    description: 'Obtener estadísticas de usuarios',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                search: {
                    method: 'GET',
                    endpoint: '/api/users/search',
                    description: 'Buscar usuarios con filtros',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    queryParams: {
                        query: 'string (opcional) - Buscar por nombre o email',
                        role: 'string (opcional) - Filtrar por rol',
                        status: 'string (opcional) - Filtrar por estado',
                        limit: 'number (opcional, default: 50) - Limitar resultados'
                    }
                },
                changeStatus: {
                    method: 'PATCH',
                    endpoint: '/api/users/:id/status',
                    description: 'Cambiar estado de usuario',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        status: 'string (requerido) - active, inactive, suspended'
                    }
                }
            }
        },
        examples: {
            register: {
                url: 'POST /api/auth/register',
                body: {
                    name: 'Juan Pérez',
                    email: 'juan@example.com',
                    password: '123456',
                    phone: '+5411234567',
                    location: 'Buenos Aires, Argentina'
                }
            },
            login: {
                url: 'POST /api/auth/login',
                body: {
                    email: 'juan@example.com',
                    password: '123456'
                }
            },
            updateUser: {
                url: 'PUT /api/users/1',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                body: {
                    name: 'Juan Carlos Pérez',
                    phone: '+5411234568'
                }
            }
        },
        responseFormat: {
            success: {
                status: 'success',
                message: 'Mensaje descriptivo',
                data: {
                    
                }
            },
            error: {
                status: 'error | fail',
                message: 'Mensaje de error',
            }
        }
    });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;