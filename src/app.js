import express from 'express';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import connectDB from './config/db.js';

const app = express();
connectDB();
app.use(express.json());

app.use('/api/users', userRoutes);

app.use(errorHandler);
export default app;