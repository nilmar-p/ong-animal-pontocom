import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { ArticleService } from "./article.service";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";

@Controller('article')
export class ArticleController {
    constructor(
        private readonly articleService: ArticleService
    ) { }

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
}