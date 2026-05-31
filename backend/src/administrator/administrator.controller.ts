import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoginDto } from './dto/login.dto';

@Controller('administrator')
export class AdministratorController {
  constructor(private readonly administratorService: AdministratorService) { }

  @Post()
  async create(@Body() createAdministratorDto: CreateAdministratorDto) {
    return this.administratorService.create(createAdministratorDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.administratorService.login(loginDto);
  }


  @Get('all')
  async getAll(@Query() pagination: PaginationDto) {
    return this.administratorService.getAll(pagination);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.administratorService.getOne(+id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.administratorService.delete(+id);
  }
}
