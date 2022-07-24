import {Post} from "../posts/entities/post.entity";
import { Exclude } from "class-transformer";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', unique: true })
  public email!: string;

  @Exclude()
  @Column({select: false})
  public password!: string;

  @Column({ type: 'varchar', nullable: true })
  public firstName: string;

  @Column({ type: 'varchar', nullable: true })
  public lastName: string;

  @OneToMany(() => Post, (post: Post) => post.author)
  public posts?: Post[];
}