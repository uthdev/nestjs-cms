import { Test, TestingModule } from '@nestjs/testing';
import RequestWithUser from '../auth/requestWithUser.interface';
import { UserController } from './user.controller';
import { UpdateUserDto } from './user.dto';
import { UserService } from './user.service';

const mockingUserService = () => ({
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
});

describe('UserController', () => {
  let userController: UserController;
  let userService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useFactory: mockingUserService }],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  describe('findAll', () => {
    it('calls the UserService.findAll', async () => {
      expect(userService.findAll).not.toHaveBeenCalled();
      userService.findAll.mockResolvedValue([]);
      await userController.findAll();
      expect(userService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('calls the UserService.findOne', async () => {
      expect(userService.findOne).not.toHaveBeenCalled();
      userService.findOne.mockResolvedValue({});
      await userController.findOne('id');
      expect(userService.findOne).toHaveBeenCalledWith('id');
    });
  });

  describe('update', () => {
    it('calls the UserService.update', async () => {
      expect(userService.update).not.toHaveBeenCalled();
      userService.update.mockResolvedValue({});
      await userController.update({ user: {id: 'id'}} as RequestWithUser,'id', {} as UpdateUserDto);
      expect(userService.update).toHaveBeenCalled();
    });
  });
});
