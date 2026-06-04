import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnimalEntity } from "./entitites/animal";
import { AnimalController } from "./animal.controller";
import { AnimalService } from "./animal.service";
import { BreedEntity } from "src/breed/entities/breed";
import { BreedService } from "src/breed/breed.service";
import { FileStorageService } from "src/common/utils/file-upload.util";

@Module({
    imports: [TypeOrmModule.forFeature([AnimalEntity, BreedEntity])],
    controllers: [AnimalController],
    providers: [AnimalService, BreedService, FileStorageService],
    exports: [AnimalService, FileStorageService],
})

export class AnimalModule { }