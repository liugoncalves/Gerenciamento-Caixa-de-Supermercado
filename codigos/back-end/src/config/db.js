import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // Definir o search_path para o schema "mercado" automaticamente
    options: '-c search_path=mercado'
});

pool.on('error', (err) => {
    console.error('Erro inesperado no pool', err);
    process.exit(-1);
});

export default pool;
