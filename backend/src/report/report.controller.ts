import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ReportService } from "./report.service";
import { CreateReportDto } from "./dto/create-report.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { imageUploadOptions } from "src/common/config/upload.config";

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) {}

    @Post()
    create(@Body() body: CreateReportDto) {
        return this.reportService.create(body);
    }

    @Get('all')
    getAll(@Query() pagination: PaginationDto) {
        return this.reportService.getAll(pagination);
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
        return this.reportService.getOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateReportDto) {
        return this.reportService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.reportService.delete(id);
    }

    @Post(':id/files')
    @UseInterceptors(FileInterceptor('file', imageUploadOptions(3)))
    uploadFile(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return this.reportService.uploadFile(id, file);
    }

    @Get(':id/files')
    getFiles(@Param('id', ParseIntPipe) id: number) {
        return this.reportService.getFiles(id);
    }

    @Delete(':id/files/:fileId')
    unlinkFile(
        @Param('id', ParseIntPipe) id: number,
        @Param('fileId', ParseIntPipe) fileId: number,
    ) {
        return this.reportService.unlinkFile(id, fileId);
    }
}