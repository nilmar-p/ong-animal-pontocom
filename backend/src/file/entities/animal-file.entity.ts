import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AnimalEntity } from 'src/animal/entitites/animal';
import { FileEntity } from 'src/file/entities/file.entity';

@Entity()
export class AnimalFileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => AnimalEntity, (animal) => animal.animalFiles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'animal_id' })
    animal: AnimalEntity;

    @ManyToOne(() => FileEntity, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'file_id' })
    file: FileEntity;
}