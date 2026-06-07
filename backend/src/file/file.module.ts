import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './entities/file.entity';
import { ArticleEntity } from 'src/article/entities/article';
import { FileStorageService } from 'src/common/utils/file-upload.util';
import { ArticleFileEntity } from './entities/article-file.entity';
import { AnimalEntity } from 'src/animal/entitites/animal';

@Module({
    imports: [
        TypeOrmModule.forFeature([FileEntity, AnimalEntity, ArticleFileEntity, ArticleEntity]),
    ],
    providers: [FileStorageService],
    exports: [FileStorageService],
})
export class FileModule {}