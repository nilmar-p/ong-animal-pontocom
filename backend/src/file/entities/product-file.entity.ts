import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductThriftEntity } from 'src/product-thrift-store/entities/product-thrift';
import { FileEntity } from 'src/file/entities/file.entity';

@Entity()
export class ProductFileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProductThriftEntity, (product) => product.productFiles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'product_id' })
    product: ProductThriftEntity;

    @ManyToOne(() => FileEntity, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'file_id' })
    file: FileEntity;
}