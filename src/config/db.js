import mysql from 'mysql2';

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const connectDB = () => {
  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      process.exit(1);
    } else {
      console.log('Database connected successfully');
    }
  });
};

export { connectDB };
export default db;