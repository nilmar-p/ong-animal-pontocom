import { Repository } from "typeorm";
import { ArticleEntity } from "./entities/article";
import { CreateArticleDto } from "./dto/create-article.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { ARTICLE_SELECT } from "./article.select";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,
    ) { }

    async getAll(pagination: PaginationDto) {
        const { limit = 10, offset = 0 } = pagination;

        const articles = await this.articleRepository.find({
            take: limit,
            skip: offset,
            select: ARTICLE_SELECT.BASIC,
        })

        return articles;
    }

    async getOne(id: number) {
        const article = await this.articleRepository.findOne({
            where: { id },
            select: ARTICLE_SELECT.FULL,
        })

        if (!article) throw new NotFoundException('Artigo não encontrado')

        return article;
    }

    async create(body: CreateArticleDto) {
        const newArticle = {
            ...body,
        }

        const article = this.articleRepository.create(newArticle);

        return await this.articleRepository.save(article);
    }

    async update(id: number, body: UpdateArticleDto) {
        const article = await this.getOne(id)

        const updatedArticle = this.articleRepository.merge(article, body);

        return await this.articleRepository.save(updatedArticle);
    }

    async delete(id: number) {
        const article = await this.getOne(id)

        return await this.articleRepository.remove(article);
    }
}