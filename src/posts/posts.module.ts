import { Module,} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UserModule } from '@/user/user.module';
import {Post} from './entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    UserModule,
  ],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
