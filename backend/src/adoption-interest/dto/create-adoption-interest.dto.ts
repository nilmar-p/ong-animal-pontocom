import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateAdoptionInterestDto {
    @IsString()
    @IsNotEmpty()
    interested: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    phone: string;

    @IsNumber()
    @Type(() => Number)
    @IsNotEmpty()
    animalId: number;

}