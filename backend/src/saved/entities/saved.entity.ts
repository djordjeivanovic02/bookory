import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class SavedBook{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.savedBooks)
    user: User;

    @ManyToOne(() => Book, book => book.savedBooks, { eager: true })
    book: Book;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}