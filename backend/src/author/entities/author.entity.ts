import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany} from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;
  
  @OneToOne(() => User, (user) => user.author)
  @JoinColumn()
  user: User;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];

  @Column()
  firstName: string;

  @Column()
  lastName: string;
  
  @Column({ nullable: true })
  about: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true })
  facebook: string;

  @Column({ nullable: true })
  instagram: string;

  @Column({ nullable: true })
  linkedin: string;
}
