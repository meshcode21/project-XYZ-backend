import mysql from 'mysql2';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const connectDB = () => {
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Database connection failed:', err);
      process.exit(1);
    } else {
      console.log('MySQL connected');
      connection.release();
    }
  });
};

export { pool };
export default connectDB;