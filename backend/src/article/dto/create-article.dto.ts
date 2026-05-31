import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateArticleDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    author: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    title: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(200)
    subtitle: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(4000)
    content: string;
}