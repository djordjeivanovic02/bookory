import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;
  
  @OneToOne(() => User, (user) => user.author)
  @JoinColumn()
  user: User;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

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
