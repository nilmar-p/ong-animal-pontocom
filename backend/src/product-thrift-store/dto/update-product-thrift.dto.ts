import { PartialType } from "@nestjs/mapped-types";
import { CreateProductThriftDto } from "./create-product-thrift.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateProductThriftDto extends PartialType(CreateProductThriftDto) { 
    @IsOptional()
    @IsBoolean()
    sold: boolean
}