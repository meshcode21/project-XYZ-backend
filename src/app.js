import express from 'express';
import errorHandler from './middlewares/errorHandler.js';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js'
import { connectDB } from './config/db.js';


const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/auth',authRoutes);

app.use(errorHandler);
export default app;