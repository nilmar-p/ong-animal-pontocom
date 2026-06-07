import { BreedEntity } from "src/breed/entities/breed";
import { AnimalFileEntity } from "src/file/entities/animal-file.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AnimalEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
    })
    name: string;

    @ManyToOne(() => BreedEntity, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'breed_id' })
    breed: BreedEntity;

    @Column({
        type: 'varchar',
        length: 300,
    })
    description: string;
    
    @OneToMany(() => AnimalFileEntity, (af) => af.animal, { cascade: true })
    animalFiles: AnimalFileEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}