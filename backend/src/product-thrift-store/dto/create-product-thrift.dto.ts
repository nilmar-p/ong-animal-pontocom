import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateProductThriftDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    description: string;

    @IsNotEmpty()
    @IsString()
    price: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(300)
    photoUrl: string;
}