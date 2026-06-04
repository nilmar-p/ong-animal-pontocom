import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReportEntity } from "./entities/report";
import { Repository } from "typeorm";
import { CreateReportDto } from "./dto/create-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { REPORT_SELECT } from "./report.select";
import { FileStorageService } from "src/common/utils/file-upload.util";

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(ReportEntity)
        private readonly reportRepository: Repository<ReportEntity>,

        private readonly uploadService: FileStorageService,
    ) { }

    async getAll(pagination: PaginationDto) {
        const { limit = 10, offset = 0 } = pagination;

        const reports = await this.reportRepository.find({
            take: limit,
            skip: offset,
            select: REPORT_SELECT.BASIC,
        })

        return reports;
    }

    async getOne(id: number) {
        const report = await this.reportRepository.findOne({
            where: { id },
            select: REPORT_SELECT.FULL,
        })

        if (!report) throw new NotFoundException('Denúncia não encontrada');

        return report;
    }

    async create(body: CreateReportDto) {
        const newReport = {
            ...body,
        };

        const report = this.reportRepository.create(newReport);

        return await this.reportRepository.save(report);
    }

    async update(id: number, body: UpdateReportDto) {
        const report = await this.getOne(id);

        const updatedReport = this.reportRepository.merge(report, body);

        return await this.reportRepository.save(updatedReport);
    }

    async delete(id: number) {
        const report = await this.getOne(id);

        return await this.reportRepository.remove(report);
    }

    async upload(files: Express.Multer.File[]) {
        return this.uploadService.uploadMany(files);
    }
}