const User = require('../models/User');
const HashUtils = require('../utils/hashUtils');
const TokenUtils = require('../utils/tokenUtils');
const { ApiError } = require('../middleware/errorHandler');

class AuthController {

    static async register(req, res, next) {
        try {
            const { email, password, name, phone, location, role } = req.body;

            // Validaciones básicas
            if (!email || !password || !name) {
                throw new ApiError('Email, contraseña y nombre son requeridos', 400);
            }

            if (password.length < 6) {
                throw new ApiError('La contraseña debe tener al menos 6 caracteres', 400);
            }

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                throw new ApiError('Formato de email inválido', 400);
            }

            // Verificar si el email ya existe
            const existingUser = await User.emailExists(email);
            if (existingUser) {
                throw new ApiError('El email ya está registrado', 400);
            }

            // Hash de la contraseña
            const hashedPassword = await HashUtils.hashPassword(password);

            // Datos del usuario a crear
            const userData = {
                email: email.toLowerCase(),
                password: hashedPassword,
                name: name.trim(),
                phone: phone || null,
                location: location || null,
                role: role || 'client'
            };

            // Crear usuario usando stored procedure
            const newUser = await User.createUser(userData);

            // Generar token JWT
            const token = TokenUtils.generateToken({
                id: newUser.id,
                email: newUser.email,
                role: newUser.role,
                name: newUser.name
            });

            // Respuesta de éxito con formato compatible con frontend
            res.status(201).json({
                status: 'success',
                message: 'Usuario registrado exitosamente',
                data: {
                    user: {
                        ...newUser,
                        token,
                        suscription: newUser.subscription || 'Basic',
                        joinedDate: newUser.joined_date,
                        lastLogin: newUser.last_login
                    }
                }
            });

        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            // Validaciones básicas
            if (!email || !password) {
                throw new ApiError('Email y contraseña son requeridos', 400);
            }

            // Buscar usuario por email (incluye password para validación)
            const user = await User.findByEmailForAuth(email.toLowerCase());
            if (!user) {
                throw new ApiError('Credenciales incorrectas', 401);
            }

            // Verificar estado del usuario
            if (user.status !== 'active') {
                throw new ApiError('Cuenta inactiva. Contacte al administrador', 401);
            }

            // Verificar contraseña
            const isPasswordValid = await HashUtils.comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw new ApiError('Credenciales incorrectas', 401);
            }

            // Generar token JWT
            const token = TokenUtils.generateToken({
                id: user.id,
                email: user.email,
                role: user.role,
                name: user.name
            });

            // Actualizar último login
            await User.updateLastLogin(user.id);

            // Respuesta de éxito con formato compatible con frontend
            res.status(200).json({
                status: 'success',
                message: 'Login exitoso',
                data: {
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        status: user.status,
                        profileImage: user.profile_image,
                        phone: user.phone,
                        location: user.location,
                        suscription: 'Basic', // Valor por defecto hasta implementar suscripciones
                        joinedDate: user.joined_date,
                        lastLogin: new Date().toISOString(),
                        token
                    }
                }
            });

        } catch (error) {
            next(error);
        }
    }

    static async verifyToken(req, res, next) {
        try {
            // El middleware ya validó el token y agregó req.tokenData
            const tokenData = req.tokenData;

            // Buscar datos actuales del usuario
            const user = await User.findByIdSafe(tokenData.id);
            if (!user) {
                throw new ApiError('Usuario no encontrado', 404);
            }

            if (user.status !== 'active') {
                throw new ApiError('Cuenta inactiva', 401);
            }

            res.status(200).json({
                status: 'success',
                message: 'Token válido',
                data: {
                    user: {
                        ...user,
                        token: req.headers.authorization?.split(' ')[1],
                        joinedDate: user.joined_date,
                        lastLogin: user.last_login
                    }
                }
            });
        } catch (error) {
            next(error);
        }
    }

    static async logout(req, res, next) {
        try {
            // En JWT no hay logout real del lado servidor,
            // el frontend debe eliminar el token
            res.status(200).json({
                status: 'success',
                message: 'Sesión cerrada correctamente',
                data: {
                    success: true
                }
            });
        } catch (error) {
            next(error);
        }
    }

    static async checkSession(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const token = TokenUtils.extractToken(authHeader);

            if (!token) {
                throw new ApiError('Token de acceso requerido', 401);
            }

            // Verificar token
            const decoded = TokenUtils.verifyToken(token);
            
            // Buscar usuario actual
            const user = await User.findByIdSafe(decoded.id);
            if (!user || user.status !== 'active') {
                throw new ApiError('Sesión inválida', 401);
            }

            res.status(200).json({
                status: 'success',
                message: 'Sesión válida',
                data: {
                    user: {
                        ...user,
                        token,
                        joinedDate: user.joined_date,
                        lastLogin: user.last_login
                    }
                }
            });

        } catch (error) {
            next(error);
        }
    }

    static async refreshToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const token = TokenUtils.extractToken(authHeader);

            if (!token) {
                throw new ApiError('Token de acceso requerido', 401);
            }

            // Generar nuevo token
            const newToken = TokenUtils.refreshToken(token);

            res.status(200).json({
                status: 'success',
                message: 'Token renovado exitosamente',
                data: {
                    token: newToken
                }
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;