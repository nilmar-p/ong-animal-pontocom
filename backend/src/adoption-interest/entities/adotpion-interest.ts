import { AnimalEntity } from "src/animal/entitites/animal";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AdoptionInterestEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
    })
    interested: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    email: string;

    @Column({
        type: 'varchar',
        length: 11,
    })
    phone: string;

    @ManyToOne(() => AnimalEntity, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'animal_id' })
    animal: AnimalEntity;
    
    @Column({
        type: 'boolean',
        default: false,
    })
    adopted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


}