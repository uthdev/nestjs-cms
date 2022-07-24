import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.entity';
import RequestWithUser from '../auth/requestWithUser.interface';
// import { AuthModule } from '../auth/auth.module';

const mockUserRepository = () => ({
  findOneBy: jest.fn(),
  find: jest.fn(),
  merge: jest.fn(),
  save: jest.fn(),
});

const mockUser = {
  id: "bae6f8f0-f8f9-11ea-b3de-0242ac130004",
  email: 'test@example.com',
  password: 'testPassword',
}

const mockUpdateUser = {
  firstName: 'testFirstName',
  lastName: 'testLastName',
}

const mockUpdatedUser = {
  ...mockUser,
  ...mockUpdateUser,
}

describe('UserService', () => {
  let userService: UserService;
  let userRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: 'UserRepository', useFactory: mockUserRepository },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>('UserRepository');
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    it('calls the UserRepository.find', async () => {
      expect(userRepository.find).not.toHaveBeenCalled();
      userRepository.find.mockResolvedValue([]);
      const result = await userService.findAll();
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('calls the UserRepository.findOneBy and returns null', async () => {
      userRepository.findOneBy.mockResolvedValue(null);
      expect(userService.findOne('id')).rejects.toThrow(NotFoundException);
    });

    it('calls the UserRepository.findOneBy and returns a user', async () => {
      userRepository.findOneBy.mockResolvedValue(mockUser);
      const result = await userService.findOne(mockUser.id);
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('calls the UserRepository.findOneBy and returns null', async () => {
      userRepository.findOneBy.mockResolvedValue(null);
      expect(userService.update({ user: {id: 'id'}} as RequestWithUser,'id', mockUpdateUser)).rejects.toThrow(NotFoundException);
    });

    it('calls the UserRepository.findOneBy and returns a user', async () => {
      userRepository.findOneBy.mockResolvedValue(mockUser);
      userRepository.merge.mockResolvedValue(mockUpdatedUser);
      userRepository.save.mockResolvedValue(mockUpdatedUser);
      const result = await userService.update({ user: { id: mockUser.id }} as RequestWithUser, mockUser.id, mockUpdateUser);
      expect(result).toEqual(mockUpdatedUser);
    });
  })
});
