import { Body, Controller, Inject, Post, ClassSerializerInterceptor, UseInterceptors, Get, UseGuards, Req } from '@nestjs/common';
import { User } from '../user/user.entity';
import { RegisterDto, LoginDto } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './auth.guard';
import RequestWithUser from './requestWithUser.interface';

@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('signup')
  @UseInterceptors(ClassSerializerInterceptor)
  public register(@Body() body: RegisterDto): Promise<User | never> {
    return this.service.register(body);
  }

  @Post('login')
  public login(@Body() body: LoginDto): Promise<Record<string, string| never>> {
    return this.service.login(body);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  me(@Req() req: RequestWithUser): User {
    return req.user;
  }

}