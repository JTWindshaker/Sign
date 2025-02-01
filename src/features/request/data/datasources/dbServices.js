import * as SQLite from 'expo-sqlite';

// Crear una función asincrónica para abrir la base de datos
let db;

const openDatabase = async () => {
    db = await SQLite.openDatabaseAsync('signApp.db');
};

// Crear la tabla si no existe
export const createTable = async () => {
    try {
        await openDatabase();

        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS request (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                url TEXT NOT NULL,
                name TEXT NOT NULL,
                is_sign BOOLEAN DEFAULT FALSE,
                sign_date TIMESTAMP
            );
        `);
        console.log('Tabla creada o ya existe');
    } catch (error) {
        console.log('Error al crear la tabla:', error);
    }
};

// Insertar un nuevo request
export const insertRequest = async (url, name, isSign, signDate) => {
    try {
        await openDatabase();

        const result = await db.runAsync(
            'INSERT INTO request (url, name, is_sign, sign_date) VALUES (?, ?, ?, ?);',
            [url, name, isSign, signDate]
        );
        console.log('Insertado con éxito:', result);
    } catch (error) {
        console.log('Error al insertar:', error);
    }
};

// Obtener todos los requests
export const getRequests = async (callback) => {
    try {
        await openDatabase();

        const result = await db.getAllAsync('SELECT * FROM request;');
        callback(result);
    } catch (error) {
        console.log('Error al obtener datos:', error);
    }
};

// Actualizar un request
export const updateRequest = async (id, url, name, isSign, signDate) => {
    try {
        await openDatabase();

        const result = await db.runAsync(
            'UPDATE request SET url = ?, name = ?, is_sign = ?, sign_date = ? WHERE id = ?;',
            [url, name, isSign, signDate, id]
        );
        console.log('Actualizado con éxito:', result);
    } catch (error) {
        console.log('Error al actualizar:', error);
    }
};

// Eliminar un request por su id
export const deleteRequest = async (id) => {
    try {
        await openDatabase();

        const result = await db.runAsync(
            'DELETE FROM request WHERE id = ?;',
            [id]
        );
        console.log('Eliminado con éxito:', result);
    } catch (error) {
        console.log('Error al eliminar:', error);
    }
};

// Uso de `prepareAsync` para consultas más complejas (por ejemplo, seleccionar con condiciones)
export const getRequestById = async (id) => {
    try {
        await openDatabase();

        const statement = await db.prepareAsync('SELECT * FROM request WHERE id = $id');
        const result = await statement.executeAsync({ $id: id });
        const firstRow = await result.getFirstAsync();
        console.log('Request encontrado:', firstRow);
        return firstRow;
    } finally {
        await statement.finalizeAsync();
    }
};
