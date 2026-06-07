import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReportEntity } from "./entities/report";
import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";
import { ReportFileEntity } from "src/file/entities/report-file.entity";
import { FileModule } from "src/file/file.module";

@Module({
    imports: [TypeOrmModule.forFeature([ReportEntity, ReportFileEntity]),
        FileModule],
    controllers: [ReportController],
    providers: [ReportService],
    exports: [ReportService],
})

export class ReportModule { }