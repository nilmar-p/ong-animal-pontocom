import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalEntity } from './entitites/animal';
import { AnimalController } from './animal.controller';
import { AnimalService } from './animal.service';
import { BreedEntity } from 'src/breed/entities/breed';
import { BreedService } from 'src/breed/breed.service';
import { AnimalFileEntity } from 'src/file/entities/animal-file.entity';
import { FileModule } from 'src/file/file.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([AnimalEntity, BreedEntity, AnimalFileEntity]),
        FileModule,
    ],
    controllers: [AnimalController],
    providers: [AnimalService, BreedService],
    exports: [AnimalService],
})
export class AnimalModule {}