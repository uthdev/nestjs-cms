

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  RelationId,
  CreateDateColumn
} from 'typeorm';
import {User} from '../../user/user.entity';


@Entity()
class Post {
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
  public authorId: number;


  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

}

export default Post;