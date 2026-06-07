import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AnimalEntity } from "./entitites/animal";
import { Repository } from "typeorm";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { UpdateAnimalDto } from "./dto/update-animal.dto";
import { BreedService } from "src/breed/breed.service";
import { BreedEntity } from "src/breed/entities/breed";
import { ANIMAL_SELECT } from "./animal.select";
import { AnimalFileEntity } from "src/file/entities/animal-file.entity";
import { FileStorageService } from "src/common/utils/file-upload.util";

@Injectable()
export class AnimalService {
    constructor(
        @InjectRepository(AnimalEntity)
        private readonly animalRepository: Repository<AnimalEntity>,

        @InjectRepository(BreedEntity)
        private readonly breedRepository: Repository<BreedEntity>,

        @InjectRepository(AnimalFileEntity)
        private readonly animalFileRepository: Repository<AnimalFileEntity>,

        private readonly breedService: BreedService,
        private readonly fileStorageService: FileStorageService,
    ) {}

    async getAll(pagination: PaginationDto) {
        const { limit = 10, offset = 0 } = pagination;

        return this.animalRepository.find({
            take: limit,
            skip: offset,
            relations: ['breed'],
            select: ANIMAL_SELECT.BASIC,
        });
    }

    async getOne(id: number) {
        const animal = await this.animalRepository.findOne({
            where: { id },
            relations: { breed: true, animalFiles: { file: true } },
            select: ANIMAL_SELECT.FULL,
        });

        if (!animal) throw new NotFoundException('Animal não encontrado!');

        return animal;
    }

    async create(body: CreateAnimalDto) {
        const breed = await this.breedService.getOne(body.breedId);

        const animal = this.animalRepository.create({ ...body, breed });
        const data = await this.animalRepository.save(animal);

        return { ...data, breedId: body.breedId };
    }

    async update(id: number, body: UpdateAnimalDto) {
        const animal = await this.animalRepository.findOne({
            where: { id },
            relations: { breed: true },
        });

        if (!animal) throw new NotFoundException('Animal não encontrado!');

        this.animalRepository.merge(animal, {
            name: body.name,
            description: body.description,
        });

        if (body.breedId) {
            const breed = await this.breedRepository.findOne({
                where: { id: body.breedId },
            });

            if (!breed) throw new NotFoundException('Raça não encontrada');

            animal.breed = breed;
        }

        return this.animalRepository.save(animal);
    }

    async delete(id: number) {
        const animal = await this.getOne(id);
        return this.animalRepository.remove(animal);
    }

    async uploadFile(animalId: number, file: Express.Multer.File) {
        const animal = await this.getOne(animalId);

        if (animal.animalFiles.length >= 5)
            throw new BadRequestException('Limite de 5 imagens atingido');

        const savedFile = await this.fileStorageService.upload(file);

        const animalFile = this.animalFileRepository.create({ animal, file: savedFile });
        await this.animalFileRepository.save(animalFile);

        return { fileId: savedFile.id, path: savedFile.path, type: savedFile.type };
    }

    async getFiles(animalId: number) {
        const animal = await this.getOne(animalId);

        return animal.animalFiles.map((af) => ({
            fileId: af.file.id,
            path: af.file.path,
            type: af.file.type,
        }));
    }

    async unlinkFile(animalId: number, fileId: number) {
        const animalFile = await this.animalFileRepository.findOne({
            where: { animal: { id: animalId }, file: { id: fileId } },
        });

        if (!animalFile) throw new NotFoundException('Vínculo não encontrado');

        await this.animalFileRepository.remove(animalFile);
        return { message: 'Imagem desvinculada com sucesso' };
    }
}