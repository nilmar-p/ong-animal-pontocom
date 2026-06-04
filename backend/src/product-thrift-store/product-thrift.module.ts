import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductThriftEntity } from "./entities/product-thrift";
import { ProductThriftController } from "./product-thrift.controller";
import { ProductThriftService } from "./product-thrift.service";
import { FileStorageService } from "src/common/utils/file-upload.util";

@Module({
    imports: [TypeOrmModule.forFeature([ProductThriftEntity])],
    controllers: [ProductThriftController],
    providers: [ProductThriftService, FileStorageService],
    exports: [ProductThriftService],
})

export class ProductThriftModule { }