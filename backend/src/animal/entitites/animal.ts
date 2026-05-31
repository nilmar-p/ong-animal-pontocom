import { BreedEntity } from "src/breed/entities/breed";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({
        type: 'varchar',
        length: 300,
    })
    photoUrl: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}