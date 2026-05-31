import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { DonationService } from "./donation.service";
import { CreateDonationDto } from "./dto/create-donation.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { UpdateDonationDto } from "./dto/update-donation.dto";

@Controller('donate')
export class DonationController {
    constructor(private readonly donateService: DonationService) { }

    @Post()
    create(@Body() body: CreateDonationDto) {
        return this.donateService.create(body)
    }

    @Get('all')
    getAll(@Query() pagination: PaginationDto) {
        return this.donateService.getAll(pagination);
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.donateService.getOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: UpdateDonationDto) {
        return this.donateService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.donateService.delete(id);
    }
}