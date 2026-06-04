import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ReportService } from "./report.service";
import { CreateReportDto } from "./dto/create-report.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { imageUploadOptions, reportUploadOptions } from "src/common/config/upload.config";

@Controller('report')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }

    @Post()
    create(@Body() body: CreateReportDto) {
        return this.reportService.create(body);
    }

    @Get('all')
    getAll(@Query() pagination: PaginationDto) {
        return this.reportService.getAll(pagination);
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        return this.reportService.getOne(id);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() body: UpdateReportDto) {
        return this.reportService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.reportService.delete(id);
    }

    @Post('upload')
    @UseInterceptors(FilesInterceptor('files', 3, reportUploadOptions()))
    upload(@UploadedFiles() files: Express.Multer.File[],) {
        return this.reportService.upload(files);
    }
}