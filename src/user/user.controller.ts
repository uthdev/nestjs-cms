
import { 
  ClassSerializerInterceptor,
  Controller,
  Req,
  UseGuards,
  UseInterceptors,
  Body,
  Inject,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/auth.guard';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './user.dto';
import RequestWithUser from '../auth/requestWithUser.interface';
import FindOneParams from '../common/findOneParams';

@Controller('users')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async findOne(@Param() {id }: FindOneParams): Promise<User> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  public async update(@Req() req: RequestWithUser, @Param('id') id: string, @Body() body: UpdateUserDto): Promise<User> {
    return this.userService.update(req, id, body);
  }
}