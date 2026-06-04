import { memoryStorage } from 'multer';
import { BadRequestException } from '@nestjs/common';

export function imageUploadOptions(maxSizeMB = 5) {
    return {
        storage: memoryStorage(),
        limits: {
            fileSize: maxSizeMB * 1024 * 1024,
        },
        fileFilter: (req, file, callback) => {
            const allowed = ['image/jpeg', 'image/png', 'image/webp'];
            if (allowed.includes(file.mimetype)) {
                callback(null, true);
            } else {
                callback(new BadRequestException('Apenas imagens JPG, PNG e WEBP são permitidas'), false);
            }
        },
    };
}

export function reportUploadOptions(maxSizeMB = 10) {
    return {
        storage: memoryStorage(),
        limits: {
            fileSize: maxSizeMB * 1024 * 1024,

        },
        fileFilter: (req, file, callback) => {
            const allowed = [
                'image/jpeg',
                'image/png',
                'image/webp',
                'video/mp4',
                'video/quicktime',
                'video/x-msvideo',
            ];
            if (allowed.includes(file.mimetype)) {
                callback(null, true);
            } else {
                callback(new BadRequestException('Apenas JPG, PNG, WEBP, MP4, MOV e AVI são permitidos'), false)
            }
        },
    };
}