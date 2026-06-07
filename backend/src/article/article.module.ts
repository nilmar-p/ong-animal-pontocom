import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article';
import { ArticleFileEntity } from 'src/file/entities/article-file.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { FileModule } from 'src/file/file.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ArticleEntity, ArticleFileEntity]),
        FileModule,
    ],
    controllers: [ArticleController],
    providers: [ArticleService],
    exports: [ArticleService],
})
export class ArticleModule {}