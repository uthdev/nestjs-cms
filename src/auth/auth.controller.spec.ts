import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginDto, RegisterDto } from './auth.dto';
import { AuthService } from './auth.service';

const mockAuthService = () => ({
  register: jest.fn(),
  login: jest.fn(),
})

describe('AuthController', () => {
  let authController: AuthController;
  let authService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useFactory: mockAuthService }],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);

  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('register', () => {
    it('calls the AuthService.register', async () => {
      expect(authService.register).not.toHaveBeenCalled();
      authService.register.mockResolvedValue({});
      await authController.register({} as RegisterDto);
      expect(authService.register).toHaveBeenCalled();
    });
  });

  describe('login', () => {
    it('calls the AuthService.login', async () => {
      expect(authService.login).not.toHaveBeenCalled();
      authService.login.mockResolvedValue({});
      await authController.login({} as LoginDto);
      expect(authService.login).toHaveBeenCalled();
    });
  });
});
