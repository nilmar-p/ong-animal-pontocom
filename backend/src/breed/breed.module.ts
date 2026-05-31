import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BreedEntity } from "./entities/breed";
import { BreedController } from "./breed.controller";
import { BreedService } from "./breed.service";
import { AnimalEntity } from "src/animal/entitites/animal";

@Module({
    imports: [TypeOrmModule.forFeature([BreedEntity, AnimalEntity])],
    controllers: [BreedController],
    providers: [BreedService],
    exports: [BreedService],
})

export class BreedModule { }