import { Controller, Get, Param } from "@nestjs/common";
import { BreedService } from "./breed.service";

@Controller('breed')
export class BreedController {
    constructor(private readonly breedService: BreedService) { }

    @Get('all')
    getAll() {
        return this.breedService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.breedService.getOne(id);
    }
}