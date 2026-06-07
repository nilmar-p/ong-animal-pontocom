import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { imageUploadOptions } from "src/common/config/upload.config";

@Controller('article')
export class ArticleController {
    constructor(private readonly articleService: ArticleService) {}

    @Post()
    create(@Body() body: CreateArticleDto) {
        return this.articleService.create(body);
    }

    @Get('all')
    getAll(@Query() pagination: PaginationDto) {
        return this.articleService.getAll(pagination);
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.articleService.getOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: UpdateArticleDto) {
        return this.articleService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.articleService.delete(id);
    }

    @Post(':id/files')
    @UseInterceptors(FileInterceptor('file', imageUploadOptions(3)))
    uploadFile(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.articleService.uploadFile(id, file);
    }

    @Get(':id/files')
    getFiles(@Param('id', ParseIntPipe) id: number) {
        return this.articleService.getFiles(id);
    }

    @Delete(':id/files/:fileId')
    unlinkFile(
        @Param('id', ParseIntPipe) id: number,
        @Param('fileId', ParseIntPipe) fileId: number,
    ) {
        return this.articleService.unlinkFile(id, fileId);
    }
}