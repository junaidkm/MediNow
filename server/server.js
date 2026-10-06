import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import healthRoutes from './routes/healthRoutes.js';
import authRoutes from './routes/authRoutes.js';
import catalogRoutes from './routes/catalogRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware: CORS & Body Parsing
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'MediNow Telehealth API is active.',
    endpoints: {
      health: 'GET /api/health',
      catalog: {
        services: 'GET /api/catalog/services',
        specialties: 'GET /api/catalog/specialties',
        doctors: 'GET /api/catalog/doctors?query=&location=',
      },
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        me: 'GET /api/auth/me',
      },
    },
  });
});

// Mount Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/catalog', catalogRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[MediNow Server] Running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
  console.log(`[MediNow Health Check] Available at http://localhost:${PORT}/api/health`);
});
