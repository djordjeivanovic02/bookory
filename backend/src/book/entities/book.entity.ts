import { Author } from 'src/author/entities/author.entity';
import { SavedBook } from 'src/saved/entities/saved.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    category: string;

    @Column({nullable: true})
    tags: string;

    @Column()
    pdf: string;

    @ManyToOne(() => Author, (author) => author.books)
    author: Author;

    @OneToMany(() => SavedBook, savedBook => savedBook.book)
    savedBooks: SavedBook[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
