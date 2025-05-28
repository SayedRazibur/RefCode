// middlewares/multer.middleware.js
import multer from 'multer';
import AppError from "../utils/AppError.js";


const memoryStorage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'video/mp4',
        'video/webm',
        'video/quicktime'
    ];

    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new AppError(
            'Invalid file type. Only images (JPEG, PNG, WEBP) and videos (MP4, WEBM, MOV) are allowed.',
            400
        ));
    }
    cb(null, true);
};

const limits = {
    fileSize: 50 * 1024 * 1024,
    files: 10,
};

export const uploadMiddleware = multer({
    storage: memoryStorage,
    fileFilter,
    limits,
}).array('files');