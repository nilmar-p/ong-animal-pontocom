import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { AdoptionInterestService } from "./adoption-interest.service";
import { CreateAdoptionInterestDto } from "./dto/create-adoption-interest.dto";
import { UpdateAdoptionInterestDto } from "./dto/update-adoption-interest.dto";

@Controller('adoption-interest')
export class AdoptionInterestController {
    constructor(private readonly adoptionInterestService: AdoptionInterestService) { }

    @Get('all')
    getAll() {
        return this.adoptionInterestService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.adoptionInterestService.getOne(id);
    }

    @Post()
    create(@Body() body: CreateAdoptionInterestDto) {
        return this.adoptionInterestService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: UpdateAdoptionInterestDto) {
        return this.adoptionInterestService.update(id, body);
    }

    @Delete('list')
    deleteList(@Query() ids: string[]) {
        return this.adoptionInterestService.deleteList(ids);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.adoptionInterestService.delete(id);
    }
}