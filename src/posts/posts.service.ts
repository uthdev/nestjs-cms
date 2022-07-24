import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, FindManyOptions, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import RequestWithUser from '../auth/requestWithUser.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import {Post} from './entities/post.entity';

@Injectable()
export class PostsService {
  @InjectRepository(Post)
  private readonly postsRepository: Repository<Post>;

  public async create(createPostDto: CreatePostDto, user: User): Promise<Post>{
    
    const post = this.postsRepository.create({
      ...createPostDto,
      author: user,
    });
    await this.postsRepository.save(post);
    return post;
  }

  public async findAll(offset?: number, limit?: number, startId?: string, options?: FindManyOptions<Post>) {
    const where: FindManyOptions<Post>['where'] = {};
    let separateCount = 0;
    if (startId) {
      where.id = MoreThan(startId);
      separateCount = await this.postsRepository.count();
    }

    const [items, count] = await this.postsRepository.findAndCount({
      where,
      order: {
        id: 'ASC'
      },
      skip: offset,
      take: limit,
      ...options
    });

    return {
      items,
      count: startId ? separateCount : count
    }
  }

  public async findAllWithAuthor(offset?: number, limit?: number, startId?: string) {
    return this.findAll(offset, limit, startId, {
      relations: ['author'],
    })
  }

  public async findOne(id: string) {
    const post = await this.postsRepository.findOne({
      where: { id }, 
      relations: ['author'] 
    });
    if(!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  public async update(req: RequestWithUser, id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.findOne({ where: { id }, relations: ['author'] });
    if(req.user.id !== post.authorId) {
      throw new ForbiddenException('You can only update your own post');
    }
    if(!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    this.postsRepository.merge(post, updatePostDto);
    return this.postsRepository.save(post);
  }

  public async delete(req: RequestWithUser, id: string): Promise<boolean>{
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    if(req.user.id !== post?.authorId) {
      throw new ForbiddenException('You can only delete your own post');
    }
    const deleteResponse = await this.postsRepository.delete(id);
    return Boolean(deleteResponse.affected);
  }
}
