import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationParams } from '@/common/types/paginationParams';
import { JwtAuthGuard } from '@/auth/auth.guard';
import RequestWithUser from '@/auth/requestWithUser.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createPostDto: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.create(createPostDto, req.user);
  }

  @Get()
  findAll(
    @Query('posts') includePosts: boolean,
    @Query() { offset, limit, startId }: PaginationParams
  ) {
    if (includePosts) {
      return this.postsService.findAllWithAuthor(offset, limit, startId);
    }
    return this.postsService.findAll(offset, limit, startId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.postsService.remove(id);
  }
}
