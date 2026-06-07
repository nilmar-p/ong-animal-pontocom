import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ReportSubject } from "../enums/report-subject.enum";
import { ReportFileEntity } from "src/file/entities/report-file.entity";

@Entity()
export class ReportEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 11,
    })
    phone: string;

    @Column({
        type: 'enum',
        enum: ReportSubject,
    })
    subject: ReportSubject;

    @Column({
        type: 'varchar',
        length: 100,
    })
    address: string;

    @Column({
        type: 'varchar',
        length: 300,
    })
    description: string;

    @Column({
        type: 'boolean',
        default: false,
    })
    solved: boolean;

    @OneToMany(() => ReportFileEntity, (rf) => rf.report, { cascade: true })
    reportFiles: ReportFileEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}