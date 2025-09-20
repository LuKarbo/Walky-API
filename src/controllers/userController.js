const User = require('../models/User');
const HashUtils = require('../utils/hashUtils');
const { ApiError } = require('../middleware/errorHandler');

class UserController {

    static async getAllUsers(req, res, next) {
        try {
            const users = await User.findAllSafe();
            
            res.status(200).json({
                status: 'success',
                results: users.length,
                data: {
                    users
                }
            });
        } catch (error) {
            next(error);
        }
    }

    static async getUserById(req, res, next) {
        try {
            const { id } = req.params;
            
            if (!id || isNaN(id)) {
                throw new ApiError('ID de usuario inválido', 400);
            }

            const user = await User.findByIdSafe(id);
            
            if (!user) {
                throw new ApiError('Usuario no encontrado', 404);
            }

            res.status(200).json({
                status: 'success',
                data: {
                    user
                }
            });
        } catch (error) {
            next(error);
        }
    }

    static async updateUser(req, res, next) {
        try {
            const { id } = req.params;
            const { email, name, password } = req.body;

            if (!id || isNaN(id)) {
                throw new ApiError('ID de usuario inválido', 400);
            }

            const existingUser = await User.findById(id);
            if (!existingUser) {
                throw new ApiError('Usuario no encontrado', 404);
            }

            const updateData = {};
            
            if (email) {
                const emailUser = await User.findByEmail(email);
                if (emailUser && emailUser.id != id) {
                    throw new ApiError('El email ya está en uso', 400);
                }
                updateData.email = email;
            }

            if (name) {
                updateData.name = name;
            }

            if (password) {
                if (password.length < 6) {
                    throw new ApiError('La contraseña debe tener al menos 6 caracteres', 400);
                }
                updateData.password = await HashUtils.hashPassword(password);
            }

            const updatedUser = await User.updateUser(id, updateData);

            res.status(200).json({
                status: 'success',
                message: 'Usuario actualizado exitosamente',
                data: {
                    user: updatedUser
                }
            });
        } catch (error) {
            next(error);
        }
    }

    static async deleteUser(req, res, next) {
        try {
            const { id } = req.params;

            if (!id || isNaN(id)) {
                throw new ApiError('ID de usuario inválido', 400);
            }

            const existingUser = await User.findById(id);
            if (!existingUser) {
                throw new ApiError('Usuario no encontrado', 404);
            }

            const deleted = await User.delete(id);
            
            if (!deleted) {
                throw new ApiError('No se pudo eliminar el usuario', 500);
            }

            res.status(200).json({
                status: 'success',
                message: 'Usuario eliminado exitosamente'
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;