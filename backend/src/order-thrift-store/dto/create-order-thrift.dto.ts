import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateOrderThriftDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    interested: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(11)
    phone: string;

    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    productId: number;
}