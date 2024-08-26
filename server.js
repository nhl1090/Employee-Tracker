const { Pool } = require('pg');
require('dotenv').config();

// Create a connection pool for PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'company_db',
});

// Connect to the database and log a message
pool.connect()
  .then((client) => {
    console.log('Connected to the database');
    client.release();  // Release the client back to the pool after the initial connection test
  })
  .catch((err) => {
    console.error('Database connection error:', err.stack);
  });

// Graceful shutdown to close the pool
process.on('SIGTERM', () => {
  pool.end(() => {
    console.log('Pool has ended');
  });
});

module.exports = pool;
