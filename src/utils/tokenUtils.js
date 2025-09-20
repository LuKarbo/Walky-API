const jwt = require('jsonwebtoken');
require('dotenv').config();

class TokenUtils {

    static generateToken() {
        try {

            const payload = {
                type: 'access_token',
                timestamp: Date.now()
            };
            
            return jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRES_IN
            });
        } catch (error) {
            throw new Error('Error al generar el token');
        }
    }

    static verifyToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Token expirado');
            } else if (error.name === 'JsonWebTokenError') {
                throw new Error('Token inválido');
            } else {
                throw new Error('Error al verificar el token');
            }
        }
    }

    static extractToken(authHeader) {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null;
        }
        return authHeader.substring(7); // sacamos el "Bearer "
    }
}

module.exports = TokenUtils;