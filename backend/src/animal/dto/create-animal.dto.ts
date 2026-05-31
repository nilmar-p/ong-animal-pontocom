import { IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength } from "class-validator";
import { Type } from "class-transformer";

export class CreateAnimalDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsNumber()
    @Type(() => Number)
    breedId: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    photoUrl: string;

    @IsString()
    @MaxLength(300)
    description: string;
}