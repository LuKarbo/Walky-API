const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const notificationRoutes = require('./notificationRoutes');
const walkerRoutes = require('./walkerRoutes');

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
            },
            notifications: {
                getAll: {
                    method: 'GET',
                    endpoint: '/api/notifications',
                    description: 'Obtener notificaciones del usuario autenticado',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                getById: {
                    method: 'GET',
                    endpoint: '/api/notifications/:id',
                    description: 'Obtener notificación específica por ID',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                create: {
                    method: 'POST',
                    endpoint: '/api/notifications',
                    description: 'Crear nueva notificación',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        userId: 'number (requerido)',
                        title: 'string (requerido)',
                        content: 'string (requerido)',
                        type: 'string (requerido) - success, warning, info, error',
                        walkerName: 'string (opcional)'
                    }
                },
                markAsRead: {
                    method: 'PATCH',
                    endpoint: '/api/notifications/:id/read',
                    description: 'Marcar notificación como leída',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                markAllRead: {
                    method: 'PATCH',
                    endpoint: '/api/notifications/mark-all-read',
                    description: 'Marcar todas las notificaciones como leídas',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                getStats: {
                    method: 'GET',
                    endpoint: '/api/notifications/stats',
                    description: 'Obtener estadísticas de notificaciones del usuario',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                }
            },
            walkers: {
                getAll: {
                    method: 'GET',
                    endpoint: '/api/walkers',
                    description: 'Obtener todos los paseadores disponibles',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            walkers: 'Array de paseadores + placeholder',
                            total: 'number - Total de paseadores reales'
                        }
                    }
                },
                getById: {
                    method: 'GET',
                    endpoint: '/api/walkers/:id',
                    description: 'Obtener paseador específico por ID',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            walker: 'Objeto con datos del paseador'
                        }
                    }
                },
                getSettings: {
                    method: 'GET',
                    endpoint: '/api/walkers/:id/settings',
                    description: 'Obtener configuraciones del paseador',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            settings: {
                                walkerId: 'number',
                                location: 'string',
                                pricePerPet: 'number',
                                hasGPSTracker: 'boolean',
                                hasDiscount: 'boolean',
                                discountPercentage: 'number',
                                updatedAt: 'string (ISO date)'
                            }
                        }
                    }
                },
                updateSettings: {
                    method: 'PUT',
                    endpoint: '/api/walkers/:id/settings',
                    description: 'Actualizar configuraciones del paseador',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        location: 'string (opcional)',
                        pricePerPet: 'number (opcional)',
                        hasGPSTracker: 'boolean (opcional)',
                        hasDiscount: 'boolean (opcional)',
                        discountPercentage: 'number (opcional, 0-100)'
                    }
                },
                getEarnings: {
                    method: 'GET',
                    endpoint: '/api/walkers/:id/earnings',
                    description: 'Obtener estadísticas de ganancias del paseador',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            earnings: {
                                monthly: 'number - Ganancias del mes actual',
                                total: 'number - Ganancias totales',
                                completedWalks: 'number - Paseos completados',
                                currentPricePerPet: 'number - Precio actual por mascota',
                                hasDiscount: 'boolean',
                                discountPercentage: 'number'
                            }
                        }
                    }
                },
                updateLocation: {
                    method: 'PATCH',
                    endpoint: '/api/walkers/:id/location',
                    description: 'Actualizar solo la ubicación del paseador',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        location: 'string (requerido)'
                    }
                },
                updatePricing: {
                    method: 'PATCH',
                    endpoint: '/api/walkers/:id/pricing',
                    description: 'Actualizar configuración de precios del paseador',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        pricePerPet: 'number (opcional)',
                        hasDiscount: 'boolean (opcional)',
                        discountPercentage: 'number (opcional, 0-100)'
                    }
                },
                search: {
                    method: 'GET',
                    endpoint: '/api/walkers/search',
                    description: 'Buscar paseadores con filtros',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    queryParams: {
                        query: 'string (opcional) - Buscar por nombre',
                        location: 'string (opcional) - Filtrar por ubicación',
                        minRating: 'number (opcional, 0-5) - Calificación mínima',
                        limit: 'number (opcional, max 100) - Limitar resultados'
                    }
                },
                validate: {
                    method: 'GET',
                    endpoint: '/api/walkers/:id/validate',
                    description: 'Validar que el usuario sea un paseador activo',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                getStats: {
                    method: 'GET',
                    endpoint: '/api/walkers/stats',
                    description: 'Obtener estadísticas generales de paseadores (solo admin)',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                }
            },
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
            },
            createNotification: {
                url: 'POST /api/notifications',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                body: {
                    userId: 1,
                    title: 'Paseo confirmado',
                    content: 'Tu paseo ha sido confirmado para mañana',
                    type: 'success',
                    walkerName: 'Sarah Johnson'
                }
            },
            markNotificationRead: {
                url: 'PATCH /api/notifications/1/read',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            },
            getWalkers: {
                url: 'GET /api/walkers',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            },
            getWalkerSettings: {
                url: 'GET /api/walkers/1/settings',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            },
            updateWalkerSettings: {
                url: 'PUT /api/walkers/1/settings',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                body: {
                    location: 'Buenos Aires, Palermo',
                    pricePerPet: 15000,
                    hasGPSTracker: true,
                    hasDiscount: false,
                    discountPercentage: 0
                }
            },
            updateWalkerPricing: {
                url: 'PATCH /api/walkers/1/pricing',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                body: {
                    pricePerPet: 18000,
                    hasDiscount: true,
                    discountPercentage: 10
                }
            },
            searchWalkers: {
                url: 'GET /api/walkers/search?query=Sarah&location=Buenos Aires&minRating=4.5&limit=5',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
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
router.use('/notifications', notificationRoutes);
router.use('/walkers', walkerRoutes);

module.exports = router;