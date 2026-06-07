import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdministratorEntity } from './entities/administrator.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AdministratorFileEntity } from 'src/file/entities/administrator-file.entity';
import { FileStorageService } from 'src/common/utils/file-upload.util';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(AdministratorEntity)
        private readonly administratorRepository: Repository<AdministratorEntity>,

        @InjectRepository(AdministratorFileEntity)
        private readonly administratorFileRepository: Repository<AdministratorFileEntity>,

        private readonly fileStorageService: FileStorageService,
        private readonly jwtService: JwtService,
    ) {}

    async getAll(pagination: PaginationDto) {
        const { limit = 10, offset = 0 } = pagination;

        return this.administratorRepository.find({
            take: limit,
            skip: offset,
            select: { id: true, name: true, email: true },
        });
    }

    async getOne(id: number) {
        const administrator = await this.administratorRepository.findOne({
            where: { id },
            relations: { administratorFiles: { file: true } },
        });

        if (!administrator) throw new NotFoundException('Administrador não encontrado');

        return administrator;
    }

    async create(createAdministratorDto: CreateAdministratorDto) {
        const existingAuth = await this.findAdministratorByEmail(createAdministratorDto.email);

        if (existingAuth) throw new ConflictException('E-mail já registrado');

        const passwordHash = await bcrypt.hash(createAdministratorDto.password, 10);

        const auth = this.administratorRepository.create({
            name: createAdministratorDto.name,
            email: createAdministratorDto.email,
            password: passwordHash,
        });

        return this.administratorRepository.save(auth);
    }

    async findAdministratorByEmail(email: string) {
        return this.administratorRepository.findOne({ where: { email } });
    }

    async login(loginDto: LoginDto) {
        const auth = await this.findAdministratorByEmail(loginDto.email);

        const isMatch = await bcrypt.compare(loginDto.password, auth?.password ?? '');

        if (!auth || !isMatch) throw new UnauthorizedException();

        const payload = { sub: auth.id, email: auth.email, name: auth.name };

        return { access_token: this.jwtService.sign(payload) };
    }

    async update(id: number, body: UpdateAdministratorDto) {
        const administrator = await this.getOne(id);

        if (body.password) {
            body.password = await bcrypt.hash(body.password, 10);
        }

        const updated = this.administratorRepository.merge(administrator, body);
        return this.administratorRepository.save(updated);
    }

    async delete(id: number) {
        const administrator = await this.getOne(id);
        return this.administratorRepository.remove(administrator);
    }

    async uploadFile(administratorId: number, file: Express.Multer.File) {
        const administrator = await this.getOne(administratorId);

        if (administrator.administratorFiles.length >= 5)
            throw new BadRequestException('Limite de 5 imagens atingido');

        const savedFile = await this.fileStorageService.upload(file);

        const administratorFile = this.administratorFileRepository.create({ administrator, file: savedFile });
        await this.administratorFileRepository.save(administratorFile);

        return { fileId: savedFile.id, path: savedFile.path, type: savedFile.type };
    }

    async getFiles(administratorId: number) {
        const administrator = await this.getOne(administratorId);

        return administrator.administratorFiles.map((af) => ({
            fileId: af.file.id,
            path: af.file.path,
            type: af.file.type,
        }));
    }

    async unlinkFile(administratorId: number, fileId: number) {
        const administratorFile = await this.administratorFileRepository.findOne({
            where: { administrator: { id: administratorId }, file: { id: fileId } },
        });

        if (!administratorFile) throw new NotFoundException('Vínculo não encontrado');

        await this.administratorFileRepository.remove(administratorFile);
        return { message: 'Imagem desvinculada com sucesso' };
    }
}