import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import jobRoutes from './routes/jobs.routes.js';
import { restrictTo } from './middlewares/authMiddleware.js';
dotenv.config(); // ✅ Load env variables

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/jobs',jobRoutes);

app.listen(3002, () => {
  console.log('Server has started on port 3002');
});
