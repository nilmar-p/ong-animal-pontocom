import { PartialType } from "@nestjs/mapped-types";
import { CreateOrderThriftDto } from "./create-order-thrift.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateOrderThriftDto extends PartialType(CreateOrderThriftDto) {
    @IsOptional()
    @IsBoolean()
    orderCompleted: boolean;
}