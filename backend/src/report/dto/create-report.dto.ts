import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { ReportSubject } from "../enums/report-subject.enum";

export class CreateReportDto {
    @IsOptional()
    @IsString()
    @MaxLength(11)
    phone: string;

    @IsEnum(ReportSubject)
    subject: ReportSubject;

    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    address: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(300)
    description: string;
}