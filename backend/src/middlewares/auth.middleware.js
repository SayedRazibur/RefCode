import jwt from 'jsonwebtoken';
import User from "../schemas/user.schema.js";
import AppError from '../utils/AppError.js';

export const protect = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) return next(new AppError('Unauthorized: No token provided', 401));

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) return next(new AppError('User no longer exists', 401));
        if (user.changedPasswordAfter(decoded.iat)) {
            return next(new AppError('Password changed recently. Please log in again', 401));
        }

        req.user = user;
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return next(new AppError('Invalid or expired token', 401));
        }
        return next(new AppError('Authentication error', 500));
    }
};

export const restrictTo = (...roles) => {
    return (req, res, next) => {
        // roles is an array ['admin', 'user']
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: 'fail',
                message: 'You do not have permission to perform this action'
            });
        }
        next();
    };
};

// Simplified version for your schema with isAdmin/isUser
export const adminOnly = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({
            status: 'fail',
            message: 'This action requires admin privileges'
        });
    }
    next();
};


