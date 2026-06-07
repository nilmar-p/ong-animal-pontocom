import { ArticleFileEntity } from 'src/file/entities/article-file.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    author: string;

    @Column({ type: 'varchar', length: 100 })
    title: string;

    @Column({ type: 'varchar', length: 200 })
    subtitle: string;

    @Column({ type: 'varchar', length: 4000 })
    content: string;

    @OneToMany(() => ArticleFileEntity, (af) => af.article, { cascade: true })
    articleFiles: ArticleFileEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}