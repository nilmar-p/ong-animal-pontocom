import { IsOptional } from 'class-validator';

export class UpdateDonationDto {
    @IsOptional()
    name: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    email: string;

    @IsOptional()
    message: string;
}