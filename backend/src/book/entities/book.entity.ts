import { Author } from 'src/author/entities/author.entity';
import { DownloadedBook } from 'src/downloads/entities/downloads.entity';
import { Review } from 'src/reviews/entities/reviews.entity';
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

    @ManyToOne(() => Author, (author) => author.books, {eager: true})
    author: Author;

    @OneToMany(() => SavedBook, savedBook => savedBook.book, {cascade: true, onDelete: 'CASCADE'})
    savedBooks: SavedBook[];

    @OneToMany(() => DownloadedBook, downloadedBook => downloadedBook.book, {cascade: true, onDelete: 'CASCADE'})
    downloadedBooks: DownloadedBook[];

    @OneToMany(() => Review, review => review.book, {cascade: true, onDelete: 'CASCADE'})
    reviews: Review[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}
