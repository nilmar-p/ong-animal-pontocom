import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ProductThriftService } from "./product-thrift.service";
import { CreateProductThriftDto } from "./dto/create-product-thrift.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { UpdateProductThriftDto } from "./dto/update-product-thrift.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { imageUploadOptions } from "src/common/config/upload.config";

@Controller('product-thrift')
export class ProductThriftController {
    constructor(private readonly productService: ProductThriftService) {}

    @Post()
    create(@Body() body: CreateProductThriftDto) {
        return this.productService.create(body);
    }

    @Get('all')
    getAll(@Query() pagination: PaginationDto) {
        return this.productService.getAll(pagination);
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProductThriftDto) {
        return this.productService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.productService.delete(id);
    }

    @Post(':id/files')
    @UseInterceptors(FileInterceptor('file', imageUploadOptions(3)))
    uploadFile(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.productService.uploadFile(id, file);
    }

    @Get(':id/files')
    getFiles(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getFiles(id);
    }

    @Delete(':id/files/:fileId')
    unlinkFile(
        @Param('id', ParseIntPipe) id: number,
        @Param('fileId', ParseIntPipe) fileId: number,
    ) {
        return this.productService.unlinkFile(id, fileId);
    }
}