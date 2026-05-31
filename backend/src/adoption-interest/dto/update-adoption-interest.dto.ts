import { PartialType } from "@nestjs/mapped-types";
import { CreateAdoptionInterestDto } from "./create-adoption-interest.dto";
import { IsBoolean, IsOptional } from "class-validator";

export class UpdateAdoptionInterestDto extends PartialType(CreateAdoptionInterestDto) {
    @IsOptional()
    @IsBoolean()
    adopted: boolean;
}