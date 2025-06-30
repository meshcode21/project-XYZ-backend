import { pool } from '../config/db.js';

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM users', (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

export const createUser = (user) => {
  console.log('Creating user:', user);
  const { name, email, password } = user;
  return new Promise((resolve, reject) => {
    pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password],
      (err, results) => {
        if (err) return reject(err);
        resolve({ id: results.insertId, ...user });
      });
  });
};
