import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdoptionInterestEntity } from "./entities/adotpion-interest";
import { Repository } from "typeorm";
import { CreateAdoptionInterestDto } from "./dto/create-adoption-interest.dto";
import { AnimalService } from "src/animal/animal.service";
import { NotFoundError } from "rxjs";
import { UpdateAdoptionInterestDto } from "./dto/update-adoption-interest.dto";
import { AnimalEntity } from "src/animal/entitites/animal";
import { ADOPTION_SELECT } from "./adoption-interest.select";

@Injectable()
export class AdoptionInterestService {
    constructor(
        @InjectRepository(AdoptionInterestEntity)
        private readonly adoptionInterestRepository: Repository<AdoptionInterestEntity>,

        @InjectRepository(AnimalEntity)
        private readonly animalRepository: Repository<AnimalEntity>,

        private readonly animalService: AnimalService,
    ) { }

    async getAll() {
        const adoptionInterests = await this.adoptionInterestRepository.find({
            relations: ['animal', 'animal.breed'],
            select: ADOPTION_SELECT.BASIC
        });

        return adoptionInterests;
    }

    async getOne(id: number) {
        const adoptionInterest = await this.adoptionInterestRepository.findOne({
            where: { id },
            relations: ['animal', 'animal.breed'],
            select: ADOPTION_SELECT.FULL
        });

        if (!adoptionInterest) throw new NotFoundException('Interesse de Adoção não encontrado')

        return adoptionInterest;
    }

    async create(body: CreateAdoptionInterestDto) {
        const animal = await this.animalService.getOne(body.animalId)

        const newAdoptionInterest = {
            ...body,
            animal
        };

        const adoptionInterest = this.adoptionInterestRepository.create(newAdoptionInterest);

        return await this.adoptionInterestRepository.save(adoptionInterest);
    }

    async update(id: number, body: UpdateAdoptionInterestDto) {
        const adoptionInterest = await this.adoptionInterestRepository.findOne({
            where: { id },
        });

        if (!adoptionInterest) throw new NotFoundException('Interesse em Adoção não encontrado');


        const updatedAdoptionInterest = this.adoptionInterestRepository.merge(adoptionInterest, body);

        if (body.animalId) {
            const animal = await this.animalRepository.findOne({
                where: { id: body.animalId }
            })

            if (!animal) throw new NotFoundException('Animal não encontrado')

            updatedAdoptionInterest.animal = { id: body.animalId } as any;
        }

        return await this.adoptionInterestRepository.save(updatedAdoptionInterest);
    }

    async deleteList(list) {
        const { ids } = list;

        await Promise.all(
            ids.map(async (item) => {
                const id = Number(item);
                const selectedAdoptionInterest = await this.adoptionInterestRepository.findOne({
                    where: { id },
                });

                if (selectedAdoptionInterest) {
                    await this.adoptionInterestRepository.delete(selectedAdoptionInterest);
                }
            }),
        );
    }

    async delete(id: number) {
        const adoptionInterest = await this.adoptionInterestRepository.find({
            where: { id },
        });

        if (!adoptionInterest) throw new NotFoundException('Interesse em Adoção não encontrado')

        return await this.adoptionInterestRepository.remove(adoptionInterest);
    }
}

