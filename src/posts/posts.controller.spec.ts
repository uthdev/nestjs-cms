import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import RequestWithUser from '../auth/requestWithUser.interface';
import { PostsService } from './posts.service';

const mockPostService = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findAllWithAuthor: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});


describe('PostsController', () => {
  let postController: PostsController;
  let postsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [{ provide: PostsService, useFactory: mockPostService }],
    }).compile();

    postController = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(postController).toBeDefined();
  });

  describe('create', () => {
    it('calls the PostsService.create', async () => {
      expect(postsService.create).not.toHaveBeenCalled();
      postsService.create.mockResolvedValue({});
      await postController.create({}, {} as RequestWithUser);
      expect(postsService.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('calls the PostsService.findAll', async () => {
      expect(postsService.findAll).not.toHaveBeenCalled();
      postsService.findAll.mockResolvedValue([]);
      await postController.findAll(false, {});
      expect(postsService.findAll).toHaveBeenCalled();
    });

    it('calls the PostsService.findAll', async () => {
      expect(postsService.findAllWithAuthor).not.toHaveBeenCalled();
      postsService.findAllWithAuthor.mockResolvedValue([]);
      await postController.findAll(true, {});
      expect(postsService.findAllWithAuthor).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('calls the PostsService.findOne', async () => {
      expect(postsService.findOne).not.toHaveBeenCalled();
      postsService.findOne.mockResolvedValue({});
      await postController.findOne({id: 'id'});
      expect(postsService.findOne).toHaveBeenCalledWith('id');
    });
  });

  describe('update', () => {
    it('calls the PostsService.update', async () => {
      expect(postsService.update).not.toHaveBeenCalled();
      postsService.update.mockResolvedValue({});
      await postController.update({user: {id: 'id'}} as RequestWithUser, { id: 'id'}, {});
      expect(postsService.update).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('calls the PostsService.delete', async () => {
      expect(postsService.delete).not.toHaveBeenCalled();
      postsService.delete.mockResolvedValue({});
      await postController.delete({user: {id: 'id'}} as RequestWithUser, { id: 'id'});
      expect(postsService.delete).toHaveBeenCalled();
    });
  });
});
