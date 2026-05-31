import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DonationEntity } from "./entities/donation";
import { DonationController } from "./donation.controller";
import { DonationService } from "./donation.service";

@Module({
    imports: [TypeOrmModule.forFeature([DonationEntity])],
    controllers: [DonationController],
    providers: [DonationService],
    exports: [DonationService],
})

export class DonationModule { }