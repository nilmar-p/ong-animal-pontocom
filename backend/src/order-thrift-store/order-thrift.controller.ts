import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { OrderThriftService } from "./order-thrift.service";
import { CreateOrderThriftDto } from "./dto/create-order-thrift.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { UpdateOrderThriftDto } from "./dto/update-order-thrift.dto";

@Controller('order-thrift')
export class OrderThriftController {
    constructor(
        private readonly orderService: OrderThriftService,
    ) { }

    @Post()
    create(@Body() body: CreateOrderThriftDto) {
        return this.orderService.create(body);
    }

    @Get('all')
    getAll(@Query() pagination: PaginationDto) {
        return this.orderService.getAll(pagination);
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.orderService.getOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: UpdateOrderThriftDto) {
        return this.orderService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.orderService.delete(id);
    }
}