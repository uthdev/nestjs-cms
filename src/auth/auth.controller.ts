import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { User } from '@/user/user.entity';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('users')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  private register(@Body() body: RegisterDto): Promise<User | never> {
    return this.service.register(body);
  }

  @Post('login')
  private login(@Body() body: LoginDto): Promise<Record<string, string| never>> {
    return this.service.login(body);
  }

}