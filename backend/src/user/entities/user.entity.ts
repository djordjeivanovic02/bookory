import { Author } from 'src/author/entities/author.entity';
import { DownloadedBook } from 'src/downloads/entities/downloads.entity';
import { SavedBook } from 'src/saved/entities/saved.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Author, author => author.user, { nullable: true, cascade: true} )
  author?: Author;

  @OneToMany(() => SavedBook, savedBook => savedBook.user)
  savedBooks: SavedBook[];

  @OneToMany(() => DownloadedBook, downloadedBook => downloadedBook.user)
  downloadedBooks: DownloadedBook[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
