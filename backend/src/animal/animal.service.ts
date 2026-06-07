import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AnimalEntity } from "./entitites/animal";
import { Repository } from "typeorm";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { UpdateAnimalDto } from "./dto/update-animal.dto";
import { BreedService } from "src/breed/breed.service";
import { BreedEntity } from "src/breed/entities/breed";
import { ANIMAL_SELECT } from "./animal.select";

@Injectable()
export class AnimalService {
    constructor(
        @InjectRepository(AnimalEntity)
        private readonly animalRepository: Repository<AnimalEntity>,

        @InjectRepository(BreedEntity)
        private readonly breedRepository: Repository<BreedEntity>,

        private readonly breedService: BreedService,
    ) { }

    async getAll(pagination: PaginationDto) {
        const { limit = 10, offset = 0 } = pagination;

        const animals = await this.animalRepository.find({
            take: limit,
            skip: offset,
            relations: ['breed'],
            select: ANIMAL_SELECT.BASIC,
        });

        return animals;
    }

    async getOne(id: number) {
        const animal = await this.animalRepository.findOne({
            where: { id },
            relations: ['breed'],
            select: ANIMAL_SELECT.FULL,
        });

        if (!animal) {
            throw new NotFoundException('Animal não encontrado!');
        }

        return animal;
    }

    async create(body: CreateAnimalDto) {
        const breed = await this.breedService.getOne(body.breedId)

        const newAnimal = {
            ...body,
            breed,
        }

        const animal = this.animalRepository.create(newAnimal)

        const data = await this.animalRepository.save(animal);

        return {
            ...data,
            breedId: body.breedId
        }
    }

    async upload(file: Express.Multer.File) {
    }

    async update(id: number, body: UpdateAnimalDto) {
        const animal = await this.animalRepository.findOne({
            where: { id },
            relations: { breed: true },
        }); //aqui encontra no banco o animal com esse id (e carrega a relação fk)

        if (!animal) {
            throw new NotFoundException('Animal não encontrado!');
        }

        this.animalRepository.merge(animal, {
            name: body.name,
            description: body.description,
        }); //aq já está mergeando os dados simples (sem o breed que eh um objeto (fk))

        if (body.breedId) {
            const breed = await this.breedRepository.findOne({
                where: { id: body.breedId },
            }); //se no body vier o breedId, ele vai encontrar que breed eh essa na tabela breed

            if (!breed) {
                throw new NotFoundException('Raça não encontrada');
            }

            animal.breed = breed; //existindo essa breed na tabela (via id), vai setar o novo breed
        }

        return this.animalRepository.save(animal); //salva
    }

    async delete(id: number) {
        const animal = await this.getOne(id);

        if (!animal) throw new NotFoundException('Animal não encontrado!');

        return await this.animalRepository.remove(animal);
    }
}