import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { ProductThriftEntity } from "./entities/product-thrift";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PRODUCT_SELECT } from "./product.select";
import { CreateProductThriftDto } from "./dto/create-product-thrift.dto";
import { UpdateProductThriftDto } from "./dto/update-product-thrift.dto";
import { ProductFileEntity } from "src/file/entities/product-file.entity";
import { FileStorageService } from "src/common/utils/file-upload.util";

@Injectable()
export class ProductThriftService {
    constructor(
        @InjectRepository(ProductThriftEntity)
        private readonly productRepository: Repository<ProductThriftEntity>,

        @InjectRepository(ProductFileEntity)
        private readonly productFileRepository: Repository<ProductFileEntity>,

        private readonly fileStorageService: FileStorageService,
    ) {}

    async getAll(pagination: PaginationDto) {
        const { limit = 10, offset = 0 } = pagination;

        return this.productRepository.find({
            take: limit,
            skip: offset,
            select: PRODUCT_SELECT.BASIC,
        });
    }

    async getOne(id: number) {
        const product = await this.productRepository.findOne({
            where: { id },
            select: PRODUCT_SELECT.FULL,
            relations: { productFiles: { file: true } },
        });

        if (!product) throw new NotFoundException('Produto não encontrado');

        return product;
    }

    async create(body: CreateProductThriftDto) {
        const product = this.productRepository.create({ ...body });
        return this.productRepository.save(product);
    }

    async update(id: number, body: UpdateProductThriftDto) {
        const product = await this.getOne(id);
        const updated = this.productRepository.merge(product, body);
        return this.productRepository.save(updated);
    }

    async delete(id: number) {
        const product = await this.getOne(id);
        return this.productRepository.remove(product);
    }

    async uploadFile(productId: number, file: Express.Multer.File) {
        const product = await this.getOne(productId);

        if (product.productFiles.length >= 5)
            throw new BadRequestException('Limite de 5 imagens atingido');

        const savedFile = await this.fileStorageService.upload(file);

        const productFile = this.productFileRepository.create({ product, file: savedFile });
        await this.productFileRepository.save(productFile);

        return { fileId: savedFile.id, path: savedFile.path, type: savedFile.type };
    }

    async getFiles(productId: number) {
        const product = await this.getOne(productId);

        return product.productFiles.map((pf) => ({
            fileId: pf.file.id,
            path: pf.file.path,
            type: pf.file.type,
        }));
    }

    async unlinkFile(productId: number, fileId: number) {
        const productFile = await this.productFileRepository.findOne({
            where: { product: { id: productId }, file: { id: fileId } },
        });

        if (!productFile) throw new NotFoundException('Vínculo não encontrado');

        await this.productFileRepository.remove(productFile);
        return { message: 'Imagem desvinculada com sucesso' };
    }
}