const express = require('express');
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const notificationRoutes = require('./notificationRoutes');
const walkerRoutes = require('./walkerRoutes');
const ticketRoutes = require('./ticketRoutes');
const bannerRoutes = require('./bannerRoutes');
const reviewRoutes = require('./reviewRoutes');
const settingRoutes = require('./settingRoutes');
const walkerRegistrationRoutes = require('./walkerRegistrationRoutes');

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
                },
                updateByAdmin: {
                    method: 'PUT',
                    endpoint: '/api/admin/users/:id',
                    description: 'Actualizar usuario (solo campos permitidos para admin)',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        name: 'string (opcional)',
                        role: 'string (opcional) - admin, client, walker, support',
                        status: 'string (opcional) - active, inactive',
                        profileImage: 'string (opcional)',
                        phone: 'string (opcional)',
                        location: 'string (opcional)'
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
            tickets: {
                getFAQs: {
                    method: 'GET',
                    endpoint: '/api/tickets/faqs',
                    description: 'Obtener preguntas frecuentes',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            faqs: 'Array de FAQs con id, question, answer, category',
                            total: 'number - Total de FAQs'
                        }
                    }
                },
                getMyTickets: {
                    method: 'GET',
                    endpoint: '/api/tickets/my-tickets',
                    description: 'Obtener tickets del usuario autenticado',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            tickets: 'Array de tickets del usuario',
                            total: 'number - Total de tickets'
                        }
                    }
                },
                getAllTickets: {
                    method: 'GET',
                    endpoint: '/api/tickets',
                    description: 'Obtener todos los tickets (solo admin/support)',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            tickets: 'Array de todos los tickets',
                            total: 'number - Total de tickets'
                        }
                    }
                },
                createTicket: {
                    method: 'POST',
                    endpoint: '/api/tickets',
                    description: 'Crear nuevo ticket de soporte',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        subject: 'string (requerido, min 5 caracteres)',
                        message: 'string (requerido, min 10 caracteres)',
                        category: 'string (opcional, default: "General")'
                    }
                },
                getTicketById: {
                    method: 'GET',
                    endpoint: '/api/tickets/:id',
                    description: 'Obtener ticket específico por ID',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            ticket: 'Objeto con datos del ticket'
                        }
                    }
                },
                respondToTicket: {
                    method: 'POST',
                    endpoint: '/api/tickets/:id/respond',
                    description: 'Responder a ticket (solo admin/support)',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        content: 'string (requerido, min 10 caracteres)',
                        status: 'string (requerido) - "Resuelto" o "Cancelada"',
                        agentName: 'string (opcional)'
                    }
                },
                updateTicketStatus: {
                    method: 'PATCH',
                    endpoint: '/api/tickets/:id/status',
                    description: 'Actualizar estado de ticket (solo admin/support)',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        status: 'string (requerido) - "En Espera", "En Progreso", "Resuelto", "Cancelada"'
                    }
                },
                getStatistics: {
                    method: 'GET',
                    endpoint: '/api/tickets/admin/statistics',
                    description: 'Obtener estadísticas de tickets (solo admin/support)',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            statistics: {
                                total: 'number - Total de tickets',
                                pending: 'number - Tickets en espera',
                                resolved: 'number - Tickets resueltos',
                                cancelled: 'number - Tickets cancelados',
                                byCategory: 'Object - Estadísticas por categoría',
                                averageResponseTime: 'number - Tiempo promedio de respuesta en horas'
                            }
                        }
                    }
                },
                getCategories: {
                    method: 'GET',
                    endpoint: '/api/tickets/categories',
                    description: 'Obtener categorías disponibles para tickets',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            categories: 'Array de categorías con id, name, description',
                            total: 'number - Total de categorías'
                        }
                    }
                }
            },
            banners: {
                getAll: {
                    method: 'GET',
                    endpoint: '/api/banners',
                    description: 'Obtener todos los banners',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            banners: 'Array de banners'
                        }
                    }
                },
                getActive: {
                    method: 'GET',
                    endpoint: '/api/banners/active',
                    description: 'Obtener solo banners activos (máximo 3)',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            banners: 'Array de banners activos ordenados por display_order'
                        }
                    }
                },
                getById: {
                    method: 'GET',
                    endpoint: '/api/banners/:id',
                    description: 'Obtener banner específico por ID',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            banner: {
                                id: 'number',
                                title: 'string',
                                description: 'string',
                                image: 'string (URL)',
                                isActive: 'boolean',
                                order: 'number',
                                createdAt: 'string (ISO date)',
                                updatedAt: 'string (ISO date)'
                            }
                        }
                    }
                },
                create: {
                    method: 'POST',
                    endpoint: '/api/banners',
                    description: 'Crear nuevo banner',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        title: 'string (requerido, máx 255 caracteres)',
                        description: 'string (requerido, máx 500 caracteres)',
                        image: 'string (requerido, URL válida)',
                        isActive: 'boolean (opcional, default: false)',
                        order: 'number (opcional, auto-asignado si no se especifica)'
                    }
                },
                update: {
                    method: 'PUT',
                    endpoint: '/api/banners/:id',
                    description: 'Actualizar banner existente',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        title: 'string (opcional)',
                        description: 'string (opcional)',
                        image: 'string (opcional, URL válida)',
                        isActive: 'boolean (opcional)',
                        order: 'number (opcional)'
                    }
                },
                delete: {
                    method: 'DELETE',
                    endpoint: '/api/banners/:id',
                    description: 'Eliminar banner',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                toggleStatus: {
                    method: 'PATCH',
                    endpoint: '/api/banners/:id/toggle-status',
                    description: 'Cambiar estado activo/inactivo del banner',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            banner: 'Objeto banner actualizado'
                        }
                    }
                },
                validate: {
                    method: 'GET',
                    endpoint: '/api/banners/:id/validate',
                    description: 'Validar que el banner existe',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                checkActiveLimit: {
                    method: 'GET',
                    endpoint: '/api/banners/status/active-limit',
                    description: 'Verificar límite de banners activos',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            activeBanners: 'number - Cantidad actual de banners activos',
                            maxAllowed: 'number - Máximo permitido (3)',
                            canAddMore: 'boolean - Si se pueden agregar más'
                        }
                    }
                }
            },
            reviews: {
                getAll: {
                    method: 'GET',
                    endpoint: '/api/reviews',
                    description: 'Obtener todas las reseñas del sistema',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            reviews: 'Array de reseñas con información completa'
                        }
                    }
                },
                getById: {
                    method: 'GET',
                    endpoint: '/api/reviews/:id',
                    description: 'Obtener reseña específica por ID',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            review: 'Objeto con datos completos de la reseña'
                        }
                    }
                },
                getByUser: {
                    method: 'GET',
                    endpoint: '/api/reviews/user/:userId',
                    description: 'Obtener todas las reseñas creadas por un usuario',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            reviews: 'Array de reseñas del usuario especificado'
                        }
                    }
                },
                getByWalker: {
                    method: 'GET',
                    endpoint: '/api/reviews/walker/:walkerId',
                    description: 'Obtener todas las reseñas de un paseador específico',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            reviews: 'Array de reseñas del paseador especificado'
                        }
                    }
                },
                create: {
                    method: 'POST',
                    endpoint: '/api/reviews',
                    description: 'Crear nueva reseña para un paseo',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        walkId: 'number (requerido) - ID del paseo',
                        walkerId: 'number (requerido) - ID del paseador',
                        rating: 'number (requerido, 1-5) - Calificación',
                        content: 'string (requerido) - Contenido de la reseña'
                    },
                    response: {
                        data: {
                            review: 'Objeto con la reseña creada'
                        }
                    }
                },
                update: {
                    method: 'PUT',
                    endpoint: '/api/reviews/:id',
                    description: 'Actualizar reseña existente (solo el creador)',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        rating: 'number (opcional, 1-5) - Nueva calificación',
                        content: 'string (opcional) - Nuevo contenido'
                    },
                    response: {
                        data: {
                            review: 'Objeto con la reseña actualizada'
                        }
                    }
                },
                delete: {
                    method: 'DELETE',
                    endpoint: '/api/reviews/:id',
                    description: 'Eliminar reseña (solo el creador)',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            reviewId: 'number - ID de la reseña eliminada'
                        }
                    }
                },
                getStats: {
                    method: 'GET',
                    endpoint: '/api/reviews/stats',
                    description: 'Obtener estadísticas generales de reseñas',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            stats: {
                                total: 'number - Total de reseñas',
                                averageRating: 'number - Calificación promedio',
                                ratingDistribution: 'Object - Distribución por calificación'
                            }
                        }
                    }
                },
                getWalkerStats: {
                    method: 'GET',
                    endpoint: '/api/reviews/walker/:walkerId/stats',
                    description: 'Obtener estadísticas de reseñas de un paseador',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            walkerId: 'number - ID del paseador',
                            stats: {
                                total: 'number - Total de reseñas del paseador',
                                averageRating: 'number - Calificación promedio',
                                ratingDistribution: 'Object - Distribución por calificación'
                            }
                        }
                    }
                },
                validate: {
                    method: 'GET',
                    endpoint: '/api/reviews/:id/validate',
                    description: 'Validar que una reseña existe',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            isValid: 'boolean - Si la reseña existe',
                            reviewId: 'number - ID de la reseña validada'
                        }
                    }
                }
            },
            settings: {
                getUserSettings: {
                    method: 'GET',
                    endpoint: '/api/settings/users/:userId',
                    description: 'Obtener configuraciones del usuario',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    response: {
                        data: {
                            settings: {
                                email: 'string',
                                notification_walk_status: 'boolean',
                                notification_announcements: 'boolean',
                                notification_subscription: 'boolean',
                                notification_messages: 'boolean',
                                notification_system_alerts: 'boolean',
                                updated_at: 'string (ISO date)'
                            }
                        }
                    }
                },
                updateUserSettings: {
                    method: 'PUT',
                    endpoint: '/api/settings/users/:userId',
                    description: 'Actualizar configuraciones del usuario',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        email: 'string (opcional)',
                        notifications: {
                            walkStatus: 'boolean (opcional)',
                            announcements: 'boolean (opcional)',
                            subscription: 'boolean (opcional)',
                            messages: 'boolean (opcional)',
                            systemAlerts: 'boolean (opcional)'
                        }
                    }
                },
                getUserSubscription: {
                    method: 'GET',
                    endpoint: '/api/settings/users/:userId/subscription',
                    description: 'Obtener suscripción del usuario',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                updateSubscription: {
                    method: 'PUT',
                    endpoint: '/api/settings/users/:userId/subscription',
                    description: 'Actualizar suscripción del usuario',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        plan: 'string (requerido)',
                        start_date: 'string (opcional)',
                        expiry_date: 'string (opcional)',
                        is_active: 'boolean (opcional)'
                    }
                },
                getSubscriptionPlans: {
                    method: 'GET',
                    endpoint: '/api/settings/subscription-plans',
                    description: 'Obtener planes de suscripción (con filtro active=true)',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                createSubscriptionPlan: {
                    method: 'POST',
                    endpoint: '/api/settings/subscription-plans',
                    description: 'Crear nuevo plan de suscripción',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        plan_id: 'string (requerido)',
                        name: 'string (requerido)',
                        price: 'number (requerido)',
                        duration: 'string (opcional)',
                        category: 'string (opcional)',
                        description: 'string (opcional)',
                        max_walks: 'number (opcional)',
                        features: 'array (requerido)',
                        support_level: 'string (opcional)',
                        cancellation_policy: 'string (opcional)',
                        discount_percentage: 'number (opcional)',
                        is_active: 'boolean (opcional)'
                    }
                },
                updateSubscriptionPlan: {
                    method: 'PUT',
                    endpoint: '/api/settings/subscription-plans/:planId',
                    description: 'Actualizar plan de suscripción',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                deleteSubscriptionPlan: {
                    method: 'DELETE',
                    endpoint: '/api/settings/subscription-plans/:planId',
                    description: 'Eliminar plan de suscripción',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                togglePlanStatus: {
                    method: 'PATCH',
                    endpoint: '/api/settings/subscription-plans/:planId/toggle-status',
                    description: 'Cambiar estado activo/inactivo del plan',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                validateSubscriptionUpgrade: {
                    method: 'GET',
                    endpoint: '/api/settings/users/:userId/upgrade/:newPlanId/validate',
                    description: 'Validar actualización de suscripción',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                }
            },
            walkerRegistrations: {
                create: {
                    method: 'POST',
                    endpoint: '/api/walker-registrations',
                    description: 'Crear nueva solicitud de registro como paseador',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        userId: 'number (requerido)',
                        fullName: 'string (requerido)',
                        phone: 'string (requerido)',
                        dni: 'string (requerido, 7-8 dígitos)',
                        city: 'string (requerido)',
                        province: 'string (requerido)',
                        images: {
                            dniFront: 'object (requerido) - {name, size, type}',
                            dniBack: 'object (requerido) - {name, size, type}',
                            selfieWithDni: 'object (requerido) - {name, size, type}'
                        }
                    }
                },
                getAll: {
                    method: 'GET',
                    endpoint: '/api/walker-registrations',
                    description: 'Obtener todas las solicitudes de registro',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                getById: {
                    method: 'GET',
                    endpoint: '/api/walker-registrations/:id',
                    description: 'Obtener solicitud específica por ID',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                update: {
                    method: 'PUT',
                    endpoint: '/api/walker-registrations/:id',
                    description: 'Actualizar estado de solicitud',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    },
                    body: {
                        status: 'string (opcional) - pending, under_review, approved, rejected',
                        adminNotes: 'string (opcional)'
                    }
                },
                delete: {
                    method: 'DELETE',
                    endpoint: '/api/walker-registrations/:id',
                    description: 'Eliminar solicitud de registro',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                getByStatus: {
                    method: 'GET',
                    endpoint: '/api/walker-registrations/status/:status',
                    description: 'Obtener solicitudes por estado',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                getByUser: {
                    method: 'GET',
                    endpoint: '/api/walker-registrations/user/:userId',
                    description: 'Obtener solicitud por usuario',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                getStatistics: {
                    method: 'GET',
                    endpoint: '/api/walker-registrations/statistics',
                    description: 'Obtener estadísticas de solicitudes',
                    headers: {
                        Authorization: 'Bearer {token} (requerido)'
                    }
                },
                promoteUser: {
                    method: 'POST',
                    endpoint: '/api/walker-registrations/:userId/promote',
                    description: 'Promover usuario a paseador',
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
            updateUserByAdmin: {
                url: 'PUT /api/admin/users/1',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                body: {
                    name: 'Juan Carlos Pérez',
                    role: 'walker',
                    status: 'active',
                    phone: '+5411234568',
                    location: 'Buenos Aires, Palermo'
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
            },
            createTicket: {
                url: 'POST /api/tickets',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                body: {
                    subject: 'Problema con la aplicación móvil',
                    message: 'La aplicación se cierra inesperadamente cuando intento programar un nuevo paseo.',
                    category: 'Problema Técnico'
                }
            },
            getFAQs: {
                url: 'GET /api/tickets/faqs',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            },
            getMyTickets: {
                url: 'GET /api/tickets/my-tickets',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            },
            respondToTicket: {
                url: 'POST /api/tickets/1001/respond',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                body: {
                    content: 'Hemos identificado el problema y ya lanzamos una actualización que lo soluciona. Por favor actualiza la aplicación desde la tienda.',
                    status: 'Resuelto',
                    agentName: 'María González - Soporte Técnico'
                }
            },
            getTicketStatistics: {
                url: 'GET /api/tickets/admin/statistics',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            },
            createBanner: {
                url: 'POST /api/banners',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                body: {
                    title: 'Oferta Especial de Verano',
                    description: '¡Obtén 20% de descuento en tu primer paseo!',
                    image: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6',
                    isActive: true,
                    order: 1
                }
            },
            updateBanner: {
                url: 'PUT /api/banners/1',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                body: {
                    title: 'Oferta Especial de Verano - Actualizada',
                    isActive: false
                }
            },
            toggleBannerStatus: {
                url: 'PATCH /api/banners/1/toggle-status',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            },
            createReview: {
                url: 'POST /api/reviews',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                body: {
                    walkId: 'W001',
                    walkerId: 1,
                    rating: 5,
                    content: 'Excelente servicio! Sarah cuidó muy bien a Max, regresó súper feliz y cansado. Definitivamente la recomiendo para futuros paseos.'
                }
            },
            getReviewsByUser: {
                url: 'GET /api/reviews/user/2',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            },
            getReviewsByWalker: {
                url: 'GET /api/reviews/walker/1',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            },
            updateReview: {
                url: 'PUT /api/reviews/R001',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                body: {
                    rating: 4,
                    content: 'Muy buen servicio, aunque podría mejorar un poco la comunicación durante el paseo.'
                }
            },
            deleteReview: {
                url: 'DELETE /api/reviews/R001',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            },
            getReviewStats: {
                url: 'GET /api/reviews/stats',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            },
            getWalkerReviewStats: {
                url: 'GET /api/reviews/walker/1/stats',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            },
            validateReview: {
                url: 'GET /api/reviews/R001/validate',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                }
            },
            updateUserSettings: {
                url: 'PUT /api/settings/users/1',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                body: {
                    email: 'juan.updated@example.com',
                    notifications: {
                        walkStatus: true,
                        announcements: false,
                        subscription: true,
                        messages: true,
                        systemAlerts: false
                    }
                }
            },
            createSubscriptionPlan: {
                url: 'POST /api/settings/subscription-plans',
                headers: {
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
                },
                body: {
                    plan_id: 'premium',
                    name: 'Premium Plan',
                    price: 29.99,
                    duration: 'monthly',
                    category: 'premium',
                    description: 'Plan premium con características avanzadas',
                    max_walks: 20,
                    features: ['Paseos premium', 'GPS avanzado', 'Soporte 24/7'],
                    support_level: '24/7',
                    cancellation_policy: 'flexible',
                    discount_percentage: 15,
                    is_active: true
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
router.use('/tickets', ticketRoutes);
router.use('/banners', bannerRoutes);
router.use('/reviews', reviewRoutes);
router.use('/settings', settingRoutes);
router.use('/walker-registrations', walkerRegistrationRoutes);

module.exports = router;