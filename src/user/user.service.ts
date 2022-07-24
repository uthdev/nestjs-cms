import RequestWithUser from '../auth/requestWithUser.interface';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if(!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  public async update(req: RequestWithUser, id: string, body: UpdateUserDto): Promise<User> {
    if(req.user.id !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }
    const user = await this.findOne(id);

    this.userRepository.merge(user, body);
    return this.userRepository.save(user);
  }
}
