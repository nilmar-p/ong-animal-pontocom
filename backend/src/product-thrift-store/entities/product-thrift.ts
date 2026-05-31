import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ProductThriftEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 200,
    })
    description: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price: string;

    @Column({
        type: 'varchar',
        length: 300,
    })
    photoUrl: string;

    @Column({
        type: 'boolean',
        default: false,
    })
    sold: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}