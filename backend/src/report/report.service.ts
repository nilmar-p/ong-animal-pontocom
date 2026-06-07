import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ReportEntity } from "./entities/report";
import { Repository } from "typeorm";
import { CreateReportDto } from "./dto/create-report.dto";
import { UpdateReportDto } from "./dto/update-report.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { REPORT_SELECT } from "./report.select";
import { ReportFileEntity } from "src/file/entities/report-file.entity";
import { FileStorageService } from "src/common/utils/file-upload.util";

@Injectable()
export class ReportService {
    constructor(
        @InjectRepository(ReportEntity)
        private readonly reportRepository: Repository<ReportEntity>,

        @InjectRepository(ReportFileEntity)
        private readonly reportFileRepository: Repository<ReportFileEntity>,

        private readonly fileStorageService: FileStorageService,
    ) {}

    async getAll(pagination: PaginationDto) {
        const { limit = 10, offset = 0 } = pagination;

        return this.reportRepository.find({
            take: limit,
            skip: offset,
            select: REPORT_SELECT.BASIC,
        });
    }

    async getOne(id: number) {
        const report = await this.reportRepository.findOne({
            where: { id },
            select: REPORT_SELECT.FULL,
            relations: { reportFiles: { file: true } },
        });

        if (!report) throw new NotFoundException('Denúncia não encontrada');

        return report;
    }

    async create(body: CreateReportDto) {
        const report = this.reportRepository.create({ ...body });
        return this.reportRepository.save(report);
    }

    async update(id: number, body: UpdateReportDto) {
        const report = await this.getOne(id);
        const updated = this.reportRepository.merge(report, body);
        return this.reportRepository.save(updated);
    }

    async delete(id: number) {
        const report = await this.getOne(id);
        return this.reportRepository.remove(report);
    }

    async uploadFile(reportId: number, file: Express.Multer.File) {
        const report = await this.getOne(reportId);

        if (report.reportFiles.length >= 5)
            throw new BadRequestException('Limite de 5 imagens atingido');

        const savedFile = await this.fileStorageService.upload(file);

        const reportFile = this.reportFileRepository.create({ report, file: savedFile });
        await this.reportFileRepository.save(reportFile);

        return { fileId: savedFile.id, path: savedFile.path, type: savedFile.type };
    }

    async getFiles(reportId: number) {
        const report = await this.getOne(reportId);

        return report.reportFiles.map((rf) => ({
            fileId: rf.file.id,
            path: rf.file.path,
            type: rf.file.type,
        }));
    }

    async unlinkFile(reportId: number, fileId: number) {
        const reportFile = await this.reportFileRepository.findOne({
            where: { report: { id: reportId }, file: { id: fileId } },
        });

        if (!reportFile) throw new NotFoundException('Vínculo não encontrado');

        await this.reportFileRepository.remove(reportFile);
        return { message: 'Imagem desvinculada com sucesso' };
    }
}