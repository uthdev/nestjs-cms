import { Test, TestingModule } from '@nestjs/testing';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import RequestWithUser from '../auth/requestWithUser.interface';
import { UserModule } from '../user/user.module';

const mockPostsRepository = () => ({
  create: jest.fn(),
  count: jest.fn(),
  findAndCount: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  merge: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

const mockPost = {
  title: 'testTitle',
  content: 'testContent',
}

const mockUser = {
  id: "bae6f8f0-f8f9-11ea-b3de-0242ac130004",
  email: 'test@example.com',
  password: 'testPassword',
}

const mockCreatedPost = {
  id: 'bae6f8f0-f8f9-11ea-b3de-0242ac130004',
  ...mockPost,
  author: mockUser,
  authorId: mockUser.id,
}

describe('PostsService', () => {
  let postsService: PostsService;
  let postsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [UserModule],
      providers: [
        PostsService,
        { provide: 'PostsRepository', useFactory: mockPostsRepository }
      ],
    }).compile();

    postsService = module.get<PostsService>(PostsService);
    postsRepository = module.get<Repository<Post>>('PostsRepository');
  });

  it('should be defined', () => {
    expect(postsService).toBeDefined();
  });

  // describe('create', () => {
  //   it('calls the postsRepository.create', async () => {
  //     expect(postsRepository.create).not.toHaveBeenCalled();
  //     postsRepository.create.mockResolvedValue(mockPost);
  //     postsRepository.save.mockResolvedValue(mockCreatedPost);
  //     const result = await postsService.create(mockPost, mockUser as User);
  //     expect(result).toEqual(mockCreatedPost);
  //   });
  // })

  // describe('findAll', () => {
  //   it('calls the postsRepository.findAndCount', async () => {
  //     expect(postsRepository.findAndCount).not.toHaveBeenCalled();
  //     postsRepository.findAndCount.mockResolvedValue([[], 0]);
  //     const result = await postsService.findAll();
  //     expect(result).toEqual([[], 0]);
  //   });
  // });

  // describe('findOne', () => {
  //   it('calls the postsRepository.findOne and returns null', async () => {
  //     postsRepository.findOne.mockResolvedValue(null);
  //     expect(postsService.findOne('id')).rejects.toThrow(NotFoundException);
  //   });

  //   it('calls the postsRepository.findOne and returns a post', async () => {
  //     postsRepository.findOne.mockResolvedValue(mockPost);
  //     const result = await postsService.findOne('id');
  //     expect(result).toEqual(mockPost);
  //   });
  // });

  // describe('findAllWithAuthor', () => {
  //   it('calls the postsRepository.findAndCount', async () => {
  //     expect(postsRepository.findAndCount).not.toHaveBeenCalled();
  //     postsRepository.findAndCount.mockResolvedValue([[], 0]);
  //     const result = await postsService.findAllWithAuthor();
  //     expect(result).toEqual([[], 0]);
  //   });
  // });

  // describe('update', () => {
  //   it('calls the PostsRepository.findOne and returns null', async () => {
  //     postsRepository.findOne.mockResolvedValue(null);
  //     expect(postsService.update({ user: {id: 'id'}} as RequestWithUser,'id', mockCreatedPost)).rejects.toThrow(NotFoundException);
  //   });

  //   it('calls the PostsRepository.findOne and returns a post', async () => {
  //     postsRepository.findOne.mockResolvedValue(mockCreatedPost);
  //     postsRepository.merge.mockResolvedValue(mockCreatedPost);
  //     postsRepository.save.mockResolvedValue(mockCreatedPost);
  //     const result = await postsService.update({ user: { id: mockUser.id }} as RequestWithUser, mockCreatedPost.id, mockCreatedPost);
  //     expect(result).toEqual(mockCreatedPost);
  //   });
  // })

  // describe('delete', () => {
  //   it('calls the PostsRepository.findOne and returns null', async () => {
  //     postsRepository.findOne.mockResolvedValue(null);
  //     expect(postsService.delete({ user: {id: 'id'}} as RequestWithUser,'id')).rejects.toThrow(NotFoundException);
  //   });

  //   it('calls the PostsRepository.findOne and user is not the author of the post', async () => {
  //     postsRepository.findOne.mockResolvedValue(mockCreatedPost);
  //     expect(postsService.delete({ user: {id: 'id'}} as RequestWithUser, mockCreatedPost.id)).rejects.toThrow(ForbiddenException);
  //   })

  //   it('calls the PostsRepository.findOne and returns a post', async () => {
  //     postsRepository.findOne.mockResolvedValue(mockCreatedPost);
  //     postsRepository.delete.mockResolvedValue({ affected: 1 });
  //     const result = await postsService.delete({ user: { id: mockUser.id }} as RequestWithUser, mockCreatedPost.id);
  //     expect(result).toEqual(true);
  //   });
  // });

});
