import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { DonationMethod } from "../enums/donation-method.enum";

@Entity()
export class DonationEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 11,
    })
    phone: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    email: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
    })
    amount: string | null;

    @Column({
        type: 'varchar',
        length: 300,
    })
    message: string;

    @Column({
        type: 'enum',
        enum: DonationMethod,
    })
    method: DonationMethod;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}