const mysql = require('mysql2/promise');
require('dotenv').config();

class Database {
    constructor() {
        this.connection = null;
    }

    async connect() {
        try {
            this.connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT
            });
            console.log('✅ Conectado a MySQL');
            return this.connection;
        } catch (error) {
            console.error('❌ Error conectando a MySQL:', error.message);
            throw error;
        }
    }

    async query(sql, params = []) {
        try {
            if (!this.connection) {
                await this.connect();
            }
            const [results] = await this.connection.execute(sql, params);
            return results;
        } catch (error) {
            console.error('❌ Error en consulta SQL:', error.message);
            throw error;
        }
    }

    async close() {
        if (this.connection) {
            await this.connection.end();
            console.log('🔌 Conexión a MySQL cerrada');
        }
    }
}

const db = new Database();

module.exports = db;