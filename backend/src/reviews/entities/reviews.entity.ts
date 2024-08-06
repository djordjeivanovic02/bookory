import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Review{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.reviews)
    user: User;

    @ManyToOne(() => Book, book => book.reviews)
    book: Book;

    @Column()
    rate: number;

    @Column({nullable: true})
    comment: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}