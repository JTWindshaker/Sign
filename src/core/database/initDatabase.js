// src/core/database/initDatabase.js
import { createTable } from '../../features/request/data/datasources/dbServices';

export const initializeDatabase = async () => {
    try {
        await createTable();
        console.log('Base de datos inicializada correctamente');
    } catch (error) {
        console.error('Error al inicializar la base de datos:', error);
    }
};
