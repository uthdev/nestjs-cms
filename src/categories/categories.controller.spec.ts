import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import RequestWithUser from '../auth/requestWithUser.interface';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';

const mockCategoriesService = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
});

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;
  let categoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [{ provide: CategoriesService, useFactory: mockCategoriesService }],
    }).compile();

    categoriesController = module.get<CategoriesController>(CategoriesController);
    categoriesService = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(categoriesController).toBeDefined();
  });

  describe('create', () => {
    it('calls the CategoriesService.create', async () => {
      expect(categoriesService.create).not.toHaveBeenCalled();
      categoriesService.create.mockResolvedValue({});
      await categoriesController.create({} as CreateCategoryDto);
      expect(categoriesService.create).toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('calls the CategoriesService.findAll', async () => {
      expect(categoriesService.findAll).not.toHaveBeenCalled();
      categoriesService.findAll.mockResolvedValue([]);
      await categoriesController.findAll();
      expect(categoriesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('calls the CategoriesService.findOne', async () => {
      expect(categoriesService.findOne).not.toHaveBeenCalled();
      categoriesService.findOne.mockResolvedValue({});
      await categoriesController.findOne({id: 'id'});
      expect(categoriesService.findOne).toHaveBeenCalled();
    });
  })

  describe('update', () => {
    it('calls the CategoriesService.update', async () => {
      expect(categoriesService.update).not.toHaveBeenCalled();
      categoriesService.update.mockResolvedValue({});
      await categoriesController.update({user: {id: 'id'}} as RequestWithUser, { id: 'id'}, {});
      expect(categoriesService.update).toHaveBeenCalled();
    });
  });

  describe('delete', () => {
    it('calls the CategoriesService.delete', async () => {
      expect(categoriesService.delete).not.toHaveBeenCalled();
      categoriesService.delete.mockResolvedValue({});
      await categoriesController.delete({user: {id: 'id'}} as RequestWithUser, { id: 'id'});
      expect(categoriesService.delete).toHaveBeenCalled();
    });
  })
});
