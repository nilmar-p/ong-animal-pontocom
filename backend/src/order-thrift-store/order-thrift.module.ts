import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderThriftEntity } from "./entities/order-thrift";
import { Module } from "@nestjs/common";
import { OrderThriftService } from "./order-thrift.service";
import { OrderThriftController } from "./order-thrift.controller";
import { ProductThriftEntity } from "src/product-thrift-store/entities/product-thrift";

@Module({
    imports: [TypeOrmModule.forFeature([OrderThriftEntity, ProductThriftEntity])],
    controllers: [OrderThriftController],
    providers: [OrderThriftService],
    exports: [OrderThriftService],
})

export class OrderThriftModule { }