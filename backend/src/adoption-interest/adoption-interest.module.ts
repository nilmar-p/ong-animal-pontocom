import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdoptionInterestEntity } from './entities/adotpion-interest';
import { AnimalModule } from 'src/animal/animal.module';
import { AdoptionInterestController } from './adoption-interest.controller';
import { AdoptionInterestService } from './adoption-interest.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([AdoptionInterestEntity]),
        AnimalModule,
    ],
    controllers: [AdoptionInterestController],
    providers: [AdoptionInterestService],
    exports: [AdoptionInterestService],
})
export class AdoptionInterestModule {}