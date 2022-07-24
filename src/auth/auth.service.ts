import { ConflictException, ForbiddenException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthHelper } from './auth.helper';

@Injectable()
export class AuthService {
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Inject(AuthHelper)
  private readonly authHelper: AuthHelper;

  public async register(body: RegisterDto): Promise<User | never> {
    const { email, password }: RegisterDto = body;
    let user: User = await this.userRepository.findOne({ where: { email } });

    if (user) {
      throw new ConflictException('User with this email already registered');
    }

    user = new User();

    user.email = email;
    user.password = this.authHelper.encodePassword(password);

    return this.userRepository.save(user);
  }

  public async login(body: LoginDto): Promise<{accessToken: string | never}> {
    const { email, password }: LoginDto = body;
    const user: User = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new ForbiddenException('Invalid email/password');
    }

    const isPasswordValid: boolean = this.authHelper.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid email/password');
    }

    const accessToken = this.authHelper.generateToken(user);
    return { accessToken };
  }
}
