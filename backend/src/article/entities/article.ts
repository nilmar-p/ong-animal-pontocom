import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class ArticleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 100,
    })
    author: string;

    @Column({
        type: 'varchar',
        length: 100,
    })
    title: string;

    @Column({
        type: 'varchar',
        length: 200,
    })
    subtitle: string;

    @Column({
        type: 'varchar',
        length: 4000,
    })
    content: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}