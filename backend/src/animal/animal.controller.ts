import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { AnimalService } from "./animal.service";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { UpdateAnimalDto } from "./dto/update-animal.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { imageUploadOptions } from "src/common/config/upload.config";

@Controller('animal')
export class AnimalController {
    constructor(private readonly animalService: AnimalService) {}

    @Post()
    create(@Body() body: CreateAnimalDto) {
        return this.animalService.create(body);
    }

    @Get('all')
    getAll(@Query() pagination: PaginationDto) {
        return this.animalService.getAll(pagination);
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.animalService.getOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateAnimalDto) {
        return this.animalService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.animalService.delete(id);
    }

    @Post(':id/files')
    @UseInterceptors(FileInterceptor('file', imageUploadOptions(3)))
    uploadFile(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.animalService.uploadFile(id, file);
    }

    @Get(':id/files')
    getFiles(@Param('id', ParseIntPipe) id: number) {
        return this.animalService.getFiles(id);
    }

    @Delete(':id/files/:fileId')
    unlinkFile(
        @Param('id', ParseIntPipe) id: number,
        @Param('fileId', ParseIntPipe) fileId: number,
    ) {
        return this.animalService.unlinkFile(id, fileId);
    }
}