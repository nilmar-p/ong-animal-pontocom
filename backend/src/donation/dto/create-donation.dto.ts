import { IsEnum, IsNotEmpty, IsString, MaxLength, ValidateIf } from "class-validator";
import { DonationMethod } from "../enums/donation-method.enum";

export class CreateDonationDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    name: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(11)
    phone: string

    @IsString()
    @MaxLength(100)
    email: string

    @IsEnum(DonationMethod)
    method: DonationMethod;

    @ValidateIf((o) => o.method !== DonationMethod.INSUMOS) //com base no method escolhido, vai exigir amount ou nao "gnores the other validators on a property when the provided condition function returns false"
    @IsNotEmpty()
    @IsString()
    amount: string;

    @IsString()
    @MaxLength(300)
    message: string;
}