import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import { getUserByEmail } from '../models/userModel.js';

export const signup = async (req, res) => {
  let { name, contact, email, password, role } = req.body;
  if (!role) role = 'seeker'; // Default role if not provided
  const hashed = await bcrypt.hash(password, 10);

  const user = await getUserByEmail(email);
  if (!user || user.length !== 0) return res.status(400).json({ error: 'Already SignUp with this email.' });

  db.query('INSERT INTO users (name, contact, email, password, role) VALUES (?, ?, ?, ?, ?)',
    [name, contact, email, hashed, role],
    (err, result) => {
      if (err) return res.status(500).json({ error: 'User already exists or DB error' });
      res.status(201).json({ message: 'Sign Up successfully. Now you can login.' });
    }
  );
};

export const login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(404).json({ error: 'User not found' });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({ token, user: { id: user.id, name: user.name, role: user.role }, message: 'Login successful' });
  });
};
