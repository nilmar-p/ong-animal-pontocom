import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReportEntity } from 'src/report/entities/report';
import { FileEntity } from 'src/file/entities/file.entity';

@Entity()
export class ReportFileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ReportEntity, (report) => report.reportFiles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'report_id' })
    report: ReportEntity;

    @ManyToOne(() => FileEntity, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'file_id' })
    file: FileEntity;
}