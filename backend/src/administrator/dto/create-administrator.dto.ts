import { IsNotEmpty, IsString, IsEmail, MaxLength } from "class-validator";

export class CreateAdministratorDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string

    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    password: string;
}
