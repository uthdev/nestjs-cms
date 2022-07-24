import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import RequestWithUser from '../auth/requestWithUser.interface';

const mockCategoriesRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  merge: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

describe('CategoriesService', () => {
  let categoriesService: CategoriesService;
  let categoriesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: 'CategoriesRepository', useFactory: mockCategoriesRepository }
      ],
    }).compile();

    categoriesService = module.get<CategoriesService>(CategoriesService);
    categoriesRepository = module.get<Repository<Category>>('CategoriesRepository');
  });

  it('should be defined', () => {
    expect(categoriesService).toBeDefined();
  });
});
