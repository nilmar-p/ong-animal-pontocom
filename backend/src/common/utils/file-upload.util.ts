import { BadRequestException, Injectable } from "@nestjs/common";
import path from "path";
import * as fs from 'fs/promises';

@Injectable()
export class FileStorageService {
    async upload(file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('Nenhum arquivo enviado');
        }

        const fileExtension = path
            .extname(file.originalname)
            .toLowerCase()
            .substring(1);

        const fileName =
            `${path.parse(file.originalname).name}_${Date.now()}.${fileExtension}`;

        const fileFullPath = path.resolve(
            process.cwd(),
            'pictures',
            fileName,
        );

        await fs.writeFile(fileFullPath, file.buffer);

        return {
            originalName: file.originalname,
            fileName,
            path: fileFullPath,
        };
    }

    async uploadMany(files: Express.Multer.File[]) {
        if (!files || files.length === 0) {
            throw new BadRequestException('Nenhum arquivo enviado');
        }

        if (files.length > 3) {
            throw new BadRequestException(
                'É permitido enviar no máximo 3 arquivos',
            );
        }

        return Promise.all(
            files.map((file) => this.upload(file)),
        );
    }
}