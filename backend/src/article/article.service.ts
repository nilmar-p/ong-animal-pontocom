import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './entities/article';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ARTICLE_SELECT } from './article.select';
import { ArticleFileEntity } from 'src/file/entities/article-file.entity';
import { FileStorageService } from 'src/common/utils/file-upload.util';

@Injectable()
export class ArticleService {
    constructor(
        @InjectRepository(ArticleEntity)
        private readonly articleRepository: Repository<ArticleEntity>,

        @InjectRepository(ArticleFileEntity)
        private readonly articleFileRepository: Repository<ArticleFileEntity>,

        private readonly fileStorageService: FileStorageService,
    ) { }

    async getAll(pagination: PaginationDto) {
        const { limit = 10, offset = 0 } = pagination;

        return this.articleRepository.find({
            take: limit,
            skip: offset,
            select: ARTICLE_SELECT.BASIC,
        });
    }

    async getOne(id: number) {
        const article = await this.articleRepository.findOne({
            where: { id },
            select: ARTICLE_SELECT.FULL,
            relations: { articleFiles: { file: true } },
        });

        if (!article) throw new NotFoundException('Artigo não encontrado');

        return article;
    }

    async create(body: CreateArticleDto) {
        const article = this.articleRepository.create({ ...body });
        return this.articleRepository.save(article);
    }

    async update(id: number, body: UpdateArticleDto) {
        const article = await this.getOne(id);
        const updated = this.articleRepository.merge(article, body);
        return this.articleRepository.save(updated);
    }

    async delete(id: number) {
        const article = await this.getOne(id);
        return this.articleRepository.remove(article);
    }

    //
    async uploadFile(articleId: number, file: Express.Multer.File) {
        const article = await this.getOne(articleId); // já traz articleFiles

        if (article.articleFiles.length >= 5)
            throw new BadRequestException('Limite de 5 imagens atingido');

        const savedFile = await this.fileStorageService.upload(file);

        const articleFile = this.articleFileRepository.create({ article, file: savedFile });
        await this.articleFileRepository.save(articleFile);

        return { fileId: savedFile.id, path: savedFile.path, type: savedFile.type };
    }

    async getFiles(articleId: number) {
        const article = await this.articleRepository.findOne({
            where: { id: articleId },
            relations: { articleFiles: { file: true } },
        });
        if (!article) throw new NotFoundException('Artigo não encontrado');

        return article.articleFiles.map((af) => ({
            fileId: af.file.id,
            path: af.file.path,
            type: af.file.type,
        }));
    }

    async unlinkFile(articleId: number, fileId: number) {
        const articleFile = await this.articleFileRepository.findOne({
            where: { article: { id: articleId }, file: { id: fileId } },
        });
        if (!articleFile) throw new NotFoundException('Vínculo não encontrado');

        await this.articleFileRepository.remove(articleFile);
        return { message: 'Imagem desvinculada com sucesso' };
    }
}