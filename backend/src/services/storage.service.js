// services/storage.service.js

import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import {bucket} from "../config/config.firebase.js";

export const generateUniqueFilename = (originalname) => {
  const ext = path.extname(originalname);
  const base = path.basename(originalname, ext)
    .replace(/\s+/g, '_')
    .toLowerCase();
  return `uploads/${uuidv4()}_${base}${ext}`;
};

export const uploadFileToStorage = async (file, filename) => {
  const blob = bucket.file(filename);

  await new Promise((resolve, reject) => {
    const stream = blob.createWriteStream({
      metadata: { contentType: file.mimetype },
      resumable: false,
    });

    stream.on('error', reject);
    stream.on('finish', resolve);
    stream.end(file.buffer);
  });

  await blob.makePublic();

  return {
    url: `https://storage.googleapis.com/${bucket.name}/${blob.name}`,
    filename: blob.name,
    originalName: file.originalname,
    contentType: file.mimetype,
    size: file.size,
  };
};

export const handleMultipleUploads = async (files) => {
  const uploadPromises = files.map(async (file) => {
    const filename = generateUniqueFilename(file.originalname);
    return await uploadFileToStorage(file, filename);
  });

  return await Promise.all(uploadPromises);
};