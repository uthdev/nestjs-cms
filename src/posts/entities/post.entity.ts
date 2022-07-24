import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
  RelationId,
  CreateDateColumn
} from 'typeorm';
import { User} from '../../user/user.entity';
import { Category } from '../../categories/entities/category.entity';


@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public title: string;

  @Column()
  public content: string;


  @Index('post_authorId_index')
  @ManyToOne(() => User, (author: User) => author.posts)
  public author: User

  @RelationId((post: Post) => post.author)
  public authorId: string;

  @ManyToMany(() => Category, (category: Category) => category.posts)
  @JoinTable()
  public categories: Category[];


  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

}