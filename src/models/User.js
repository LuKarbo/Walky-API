const BaseModel = require('./BaseModel');
const db = require('../config/database');
const { ApiError } = require('../middleware/errorHandler');

class User extends BaseModel {
    constructor() {
        super('users');
    }

    async findByEmail(email) {
        try {
            const sql = `SELECT * FROM ${this.tableName} WHERE email = ? LIMIT 1`;
            const results = await db.query(sql, [email]);
            return results.length > 0 ? results[0] : null;
        } catch (error) {
            throw new ApiError('Error al buscar usuario por email', 500);
        }
    }

    async emailExists(email) {
        try {
            const sql = `SELECT COUNT(*) as count FROM ${this.tableName} WHERE email = ?`;
            const result = await db.query(sql, [email]);
            return result[0].count > 0;
        } catch (error) {
            throw new ApiError('Error al verificar email', 500);
        }
    }

    async createUser(userData) {
        try {
            const user = await this.create(userData);
            delete user.password;
            return user;
        } catch (error) {
            throw error;
        }
    }

    async findByIdSafe(id) {
        try {
            const sql = `SELECT id, email, name, created_at FROM ${this.tableName} WHERE id = ? LIMIT 1`;
            const results = await db.query(sql, [id]);
            return results.length > 0 ? results[0] : null;
        } catch (error) {
            throw new ApiError('Error al buscar usuario', 500);
        }
    }

    async findAllSafe() {
        try {
            const sql = `SELECT id, email, name, created_at FROM ${this.tableName}`;
            return await db.query(sql);
        } catch (error) {
            throw new ApiError('Error al obtener usuarios', 500);
        }
    }

    async updateUser(id, userData) {
        try {
            await this.update(id, userData);
            return this.findByIdSafe(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new User();