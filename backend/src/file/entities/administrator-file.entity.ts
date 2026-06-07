import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AdministratorEntity } from 'src/administrator/entities/administrator.entity';
import { FileEntity } from 'src/file/entities/file.entity';

@Entity()
export class AdministratorFileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => AdministratorEntity, (administrator) => administrator.administratorFiles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'administrator_id' })
    administrator: AdministratorEntity;

    @ManyToOne(() => FileEntity, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'file_id' })
    file: FileEntity;
}