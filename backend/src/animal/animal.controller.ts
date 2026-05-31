import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { AnimalService } from "./animal.service";
import { CreateAnimalDto } from "./dto/create-animal.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { UpdateAnimalDto } from "./dto/update-animal.dto";

@Controller('animal')
export class AnimalController {
    constructor(private readonly animalService: AnimalService) { }

    @Post()
    create(@Body() body: CreateAnimalDto) {
        return this.animalService.create(body);
    }

    @Get('all')
    getAll(@Query() pagination: PaginationDto) {
        return this.animalService.getAll(pagination);
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.animalService.getOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: UpdateAnimalDto) {
        return this.animalService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.animalService.delete(id);
    }
}