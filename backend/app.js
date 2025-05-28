import express from 'express';
const app = express();

import cors from 'cors';
import dotenv from 'dotenv';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import errorHandler from './src/middlewares/error.handler.js';
import connectDB from './src/db/connect.db.js';

// APIs Routes
import todoRoutes from './src/routes/todo.routes.js';

// Rate limiter configuration
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});

dotenv.config();

// Middleware

app.use(
    cors({
        origin: [
            process.env.FRONTEND_URL,
            process.env.DASHBOARD_URL,
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:5175',
            'http://localhost:5176',
            'http://localhost:5177',
            'http://localhost:5178',
            'http://localhost:5179',
            'http://localhost:5180',
        ],
    })
);

app.use(express.json({ limit: '50Mb' }));
app.use(express.urlencoded({ limit: '50Mb', parameterLimit: 5000, extended: true }));
app.use(hpp());
app.use(helmet());
app.use(limiter);
app.use(cookieParser());

//all routes

app.use('/api/v1/todos', todoRoutes);

// Root route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: {
            message: 'Welcome to Khajana Server! take gold and treasure as much as you can 😊',
        },
    });
});

connectDB();

//Global Error Handler
app.use(errorHandler);

// Graceful shutdown handling
const gracefulShutdown = () => {
    console.log('Server shutting down...');
    process.exit(0);
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);

export default app;
