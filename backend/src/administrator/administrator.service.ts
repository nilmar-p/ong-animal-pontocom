import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AdministratorEntity } from './entities/administrator.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AdministratorService {
  constructor(
    @InjectRepository(AdministratorEntity)

    private readonly administratorRepository: Repository<AdministratorEntity>,
    private jwtService: JwtService,
  ) { }

  async getAll(pagination: PaginationDto) {
    const { limit = 10, offset = 0 } = pagination;

    const administrators = await this.administratorRepository.find({
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    return administrators;
  }

  async getOne(id: number) {
    const administrator = await this.administratorRepository.findOne({
      where: { id },
    })

    if (!administrator) throw new NotFoundException('Administrador não encontrado')

    return administrator;
  }

  async create(createAdministratorDto: CreateAdministratorDto) {
    const existingAuth = await this.findAdministratorByEmail(createAdministratorDto.email);

    if (existingAuth) throw new ConflictException('E-mail já registrado');

    const passwordHash = await bcrypt.hash(createAdministratorDto.password, 10);

    const newAuth = {
      name: createAdministratorDto.name,
      email: createAdministratorDto.email,
      password: passwordHash,
    };

    const auth = this.administratorRepository.create(newAuth);

    return this.administratorRepository.save(auth);
  }

  async findAdministratorByEmail(email: string) {
    const auth = await this.administratorRepository.findOne({
      where: { email }
    });

    return auth;
  }

  async login(loginDto: LoginDto) {
    const auth = await this.findAdministratorByEmail(loginDto.email);

    const isMatch = await bcrypt.compare(loginDto.password, auth?.password ?? '');

    if (!auth || !isMatch) throw new UnauthorizedException();

    const payload = {
      sub: auth.id,
      email: auth.email,
      name: auth.name
    };

    return { access_token: this.jwtService.sign(payload) };
  }

  async update(id: number, body: UpdateAdministratorDto) {
    const administrator = await this.getOne(id);

    if (body.password) {
      body.password = await bcrypt.hash(body.password, 10);
    }

    const updatedAdministrator = this.administratorRepository.merge(administrator, body);

    return this.administratorRepository.save(updatedAdministrator);
  }

  async delete(id: number) {
    const administrator = await this.getOne(id);

    return await this.administratorRepository.remove(administrator);
  }
}
