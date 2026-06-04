import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleEntity } from "./entities/article";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { FileStorageService } from "src/common/utils/file-upload.util";

@Module({
    imports: [TypeOrmModule.forFeature([ArticleEntity])],
    controllers: [ArticleController],
    providers: [ArticleService, FileStorageService],
    exports: [ArticleService],
})

export class ArticleModule { }