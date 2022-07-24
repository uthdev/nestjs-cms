import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationParams } from '../common/types/paginationParams';
import { JwtAuthGuard } from '../auth/auth.guard';
import RequestWithUser from '../auth/requestWithUser.interface';
import FindOneParams from '../common/findOneParams';

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
  findOne(@Param() {id}: FindOneParams) {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Req() req: RequestWithUser, @Param() {id}: FindOneParams, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(req, id, updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Req() req: RequestWithUser, @Param() {id}: FindOneParams) {
    return this.postsService.delete(req, id);
  }
}
