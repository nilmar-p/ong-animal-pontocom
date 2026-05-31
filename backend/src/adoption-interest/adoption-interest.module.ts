import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { AdoptionInterestEntity } from "./entities/adotpion-interest";
import { AnimalModule } from "src/animal/animal.module";
import { AdoptionInterestController } from './adoption-interest.controller';
import { AdoptionInterestService } from './adoption-interest.service';
import { AnimalEntity } from 'src/animal/entitites/animal';
import { AnimalService } from 'src/animal/animal.service';
import { BreedService } from 'src/breed/breed.service';
import { BreedEntity } from 'src/breed/entities/breed';

@Module({
    imports: [
        TypeOrmModule.forFeature([AdoptionInterestEntity, AnimalEntity, BreedEntity]),
        AnimalModule
    ],
    controllers: [AdoptionInterestController],
    providers: [AdoptionInterestService, AnimalService, BreedService],
    exports: [AdoptionInterestService],
})
export class AdoptionInterestModule { }