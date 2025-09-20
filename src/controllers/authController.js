const User = require('../models/User');
const HashUtils = require('../utils/hashUtils');
const TokenUtils = require('../utils/tokenUtils');
const { ApiError } = require('../middleware/errorHandler');

class AuthController {

    static async register(req, res, next) {
        try {
            const { email, password, name } = req.body;

            if (!email || !password || !name) {
                throw new ApiError('Email, contraseña y nombre son requeridos', 400);
            }

            if (password.length < 6) {
                throw new ApiError('La contraseña debe tener al menos 6 caracteres', 400);
            }

            const existingUser = await User.emailExists(email);
            if (existingUser) {
                throw new ApiError('El email ya está registrado', 400);
            }

            const hashedPassword = await HashUtils.hashPassword(password);

            const userData = {
                email,
                password: hashedPassword,
                name,
                created_at: new Date()
            };

            const newUser = await User.createUser(userData);

            res.status(201).json({
                status: 'success',
                message: 'Usuario registrado exitosamente',
                data: {
                    user: newUser
                }
            });

        } catch (error) {
            next(error);
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                throw new ApiError('Email y contraseña son requeridos', 400);
            }

            const user = await User.findByEmail(email);
            if (!user) {
                throw new ApiError('Credenciales incorrectas', 401);
            }

            const isPasswordValid = await HashUtils.comparePassword(password, user.password);
            if (!isPasswordValid) {
                throw new ApiError('Credenciales incorrectas', 401);
            }

            const token = TokenUtils.generateToken();

            res.status(200).json({
                status: 'success',
                message: 'Login exitoso',
                data: {
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        name: user.name
                    }
                }
            });

        } catch (error) {
            next(error);
        }
    }

    static async verifyToken(req, res, next) {
        try {
            res.status(200).json({
                status: 'success',
                message: 'Token válido',
                data: {
                    tokenData: req.tokenData
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AuthController;