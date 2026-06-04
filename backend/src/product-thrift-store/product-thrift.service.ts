import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { ProductThriftEntity } from "./entities/product-thrift";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { PRODUCT_SELECT } from "./product.select";
import { CreateProductThriftDto } from "./dto/create-product-thrift.dto";
import { UpdateProductThriftDto } from "./dto/update-product-thrift.dto";
import { FileStorageService } from "src/common/utils/file-upload.util";

@Injectable()
export class ProductThriftService {
    constructor(
        @InjectRepository(ProductThriftEntity)
        private readonly productRepository: Repository<ProductThriftEntity>,

        private readonly uploadService: FileStorageService,
    ) { }

    async getAll(pagination: PaginationDto) {
        const { limit = 10, offset = 0 } = pagination;

        const products = await this.productRepository.find({
            take: limit,
            skip: offset,
            select: PRODUCT_SELECT.BASIC
        });

        return products;
    }

    async getOne(id: number) {
        const product = await this.productRepository.findOne({
            where: { id },
            select: PRODUCT_SELECT.FULL
        })

        if (!product) throw new NotFoundException('Produto não encontrado')

        return product;
    }

    async create(body: CreateProductThriftDto) {
        const newProduct = {
            ...body,
        }

        const product = this.productRepository.create(newProduct);

        return await this.productRepository.save(product);
    }

    async update(id: number, body: UpdateProductThriftDto) {
        const product = await this.getOne(id);

        const updatedProduct = this.productRepository.merge(product, body);

        return await this.productRepository.save(updatedProduct);
    }

    async delete(id: number) {
        const product = await this.getOne(id);

        return await this.productRepository.remove(product);
    }

    async upload(file: Express.Multer.File) {
        return this.uploadService.upload(file);
    }
}