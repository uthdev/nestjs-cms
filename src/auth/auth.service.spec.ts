import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConflictException, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { AuthHelper } from './auth.helper';

const mockUserRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
});

const mockAuthHelper = () => ({
  encodePassword: jest.fn(),
  isPasswordValid: jest.fn(),
  generateToken: jest.fn(),
  decode: jest.fn(),
});

const mockUser = {
  email: 'test@example.com',
  password: 'testPassword',
}

const mockCreatedUser = {
  ...mockUser,
  id: "bae6f8f0-f8f9-11ea-b3de-0242ac130004",
}

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository;
  let authHelper;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [JwtModule],
      providers: [AuthService,
        { provide: 'UserRepository', useFactory: mockUserRepository },
        { provide: AuthHelper, useFactory: mockAuthHelper },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>('UserRepository');
    authHelper = module.get<AuthHelper>(AuthHelper);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('register', () => {
    it('calls the UserRepository.findOne and creates a new user', async () => {
      expect(userRepository.findOne).not.toHaveBeenCalled();
      userRepository.findOne.mockResolvedValue(null);
      userRepository.save.mockResolvedValue(mockCreatedUser);
      const result = await authService.register(mockUser);
      expect(userRepository.findOne).toHaveBeenCalled();
      expect(result).toEqual(mockCreatedUser);
    })

    it('calls the UserRepository.findOne and returns an error', async () => {
      userRepository.findOne.mockResolvedValue(mockCreatedUser);
      expect(authService.register(mockUser)).rejects.toThrow(ConflictException);
    })
  })

  describe('login', () => {
    it('calls the UserRepository.findOne and returns nulls for nonexistent user', async () => {
      expect(userRepository.findOne).not.toHaveBeenCalled();
      userRepository.findOne.mockResolvedValue(null);
      expect(authService.login(mockUser)).rejects.toThrow(ForbiddenException);
    })

    it('throws an error if password is invalid', async () => {
      userRepository.findOne.mockResolvedValue(mockCreatedUser);
      authHelper.isPasswordValid.mockResolvedValue(false);
      expect(authService.login(mockUser)).rejects.toThrow(ForbiddenException);
    })

    it('calls the UserRepository.findOne and returns an accessToken', async () => {
      userRepository.findOne.mockResolvedValue(mockCreatedUser);
      authHelper.isPasswordValid.mockResolvedValue(true);
      authHelper.generateToken.mockResolvedValue({ accessToken: 'testToken' });
      const result = await authService.login(mockUser);
      expect(result.accessToken).toBeDefined();
    })
  })
});
