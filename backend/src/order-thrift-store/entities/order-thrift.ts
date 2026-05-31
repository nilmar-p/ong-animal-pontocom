import { ProductThriftEntity } from "src/product-thrift-store/entities/product-thrift";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class OrderThriftEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
    })
    interested: string;

    @Column({
        type: 'varchar',
        length: 11,
    })
    phone: string;

    @ManyToOne(() => ProductThriftEntity, { onDelete: 'RESTRICT', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: ProductThriftEntity;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
    })
    price: string;

    @Column({
        type: 'boolean',
        default: false,
    })
    orderCompleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}