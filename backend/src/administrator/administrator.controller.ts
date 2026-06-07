import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseInterceptors, ParseIntPipe, UploadedFile } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { CreateAdministratorDto } from './dto/create-administrator.dto';
import { UpdateAdministratorDto } from './dto/update-administrator.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { LoginDto } from './dto/login.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from 'src/common/config/upload.config';

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

  @Post(':id/files')
  @UseInterceptors(FileInterceptor('file', imageUploadOptions(3)))
  uploadFile(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.administratorService.uploadFile(id, file);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateAdministratorDto) {
    return this.administratorService.update(+id, body);
  }

  @Get(':id/files')
  getFiles(@Param('id', ParseIntPipe) id: number) {
    return this.administratorService.getFiles(id);
  }

  @Delete(':id/files/:fileId')
  unlinkFile(
    @Param('id', ParseIntPipe) id: number,
    @Param('fileId', ParseIntPipe) fileId: number,
  ) {
    return this.administratorService.unlinkFile(id, fileId);
  }
}
