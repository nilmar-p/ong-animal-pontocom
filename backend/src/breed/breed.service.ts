import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BreedEntity } from "./entities/breed";
import { Repository } from "typeorm";

@Injectable()
export class BreedService {
    constructor(
        @InjectRepository(BreedEntity)
        private readonly breedRepository: Repository<BreedEntity>,
    ) { }

    async getAll() {
        const breeds = await this.breedRepository.find({
            select: {
                id: true,
                name: true,
            },
        });
        return breeds;
    }

    async getOne(id: number) {
        const breed = await this.breedRepository.findOne({
            where: { id },
        });

        if (!breed) throw new NotFoundException('Raça não encontrada');

        return breed;
    }
}