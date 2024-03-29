import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import RequestWithUser from '../auth/requestWithUser.interface';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  @InjectRepository(Category)
  private readonly categoriesRepository: Repository<Category>;

  public async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoriesRepository.create(createCategoryDto);
    await this.categoriesRepository.save(newCategory);
    return newCategory;
  }

  public async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find({ relations: ['posts'] });
  }

  public async findOne(id: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne(
      {
        where: { id },
        relations: ['posts'],
        withDeleted: true
      }
    );
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  public async update(req: RequestWithUser, id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category>{
    const category = await this.categoriesRepository.findOne({ where: { id }, relations: ['posts'] });
    if(!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    this.categoriesRepository.merge(category, updateCategoryDto);
    return this.categoriesRepository.save(category);
  }

  public async delete(req: RequestWithUser, id: string): Promise<boolean>{
    const deleteResponse = await this.categoriesRepository.delete(id);
    if(!deleteResponse.affected) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return Boolean(deleteResponse.affected);
  }
}
