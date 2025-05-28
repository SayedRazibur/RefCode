import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateToken = (id,email,accountStatus) => {
    return jwt.sign({ id,email,accountStatus }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

export const generateRefreshToken = (id, deviceInfo, ipAddress) => {
    const token = jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: '7d'
    });
    return {
        token,
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        deviceInfo,
        ipAddress
    };
};

export const generateOTP = (length = 6) => {
    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;
    return Math.floor(min + Math.random() * (max - min + 1)).toString();
};

export const hashToken = (token) => {
    return crypto.createHash('sha256').update(token).digest('hex');
};