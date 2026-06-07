import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductThriftEntity } from "./entities/product-thrift";
import { ProductThriftController } from "./product-thrift.controller";
import { ProductThriftService } from "./product-thrift.service";
import { ProductFileEntity } from "src/file/entities/product-file.entity";
import { FileModule } from "src/file/file.module";

@Module({
    imports: [TypeOrmModule.forFeature([ProductThriftEntity, ProductFileEntity]),
        FileModule],
    controllers: [ProductThriftController],
    providers: [ProductThriftService],
    exports: [ProductThriftService],
})

export class ProductThriftModule { }