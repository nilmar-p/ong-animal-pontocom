import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ArticleEntity } from 'src/article/entities/article';
import { FileEntity } from 'src/file/entities/file.entity';

@Entity()
export class ArticleFileEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ArticleEntity, (article) => article.articleFiles, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'article_id' })
    article: ArticleEntity;

    @ManyToOne(() => FileEntity, { onDelete: 'CASCADE', eager: true })
    @JoinColumn({ name: 'file_id' })
    file: FileEntity;
}