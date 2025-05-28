// controllers/upload.controller.js
import { handleMultipleUploads } from '../services/storage.service.js';
import AppError from '../utils/AppError.js';
import catchAsync from '../utils/catchAsync.js';

export const uploadFiles = catchAsync(async (req, res, next) => {
    try {
        if (!req.files || req.files.length === 0) {
            throw new AppError('No files were uploaded', 400);
        }

        const results = await handleMultipleUploads(req.files);

        res.status(200).json({
            code: 200,
            success: true,
            data: {
                files: results,
            },
        });
    } catch (error) {
        return next(new AppError('Error uploading files', 500));
    }
});
