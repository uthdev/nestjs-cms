import {Post} from "@/posts/entities/post.entity";
import { PrimaryGeneratedColumn, Column, ManyToMany, DeleteDateColumn, Entity } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'varchar', unique: true })
  public name: string;

  @Column({ type: 'varchar'})
  public description: string;

  @ManyToMany(() => Post, (post: Post) => post.categories)
  public posts: Post[];

  @DeleteDateColumn()
  public deletedAt: Date;
}
