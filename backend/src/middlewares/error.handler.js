import AppError from '../utils/AppError.js';

// Global Error Handler
const errorHandler = (err, req, res, next) => {
    let { code, message } = err;

    // Default values if undefined
    code = code || 500;
    message = message || 'Something went wrong!';

    // Define error type
    const errorType = `${code}`.startsWith('4') ? 'client error' : 'server error';

    // Prettify error response
    const errorResponse = {
        status: errorType,
        success: false,
        code,
        message,
    };

    // Include stack trace only in development
    if (process.env.NODE_ENV === 'development') {
        errorResponse.stack = err.stack?.split('\n').map((line) => line.trim());
    }

    res.status(code).json(errorResponse);
};

export default errorHandler;
