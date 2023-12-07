import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MongoPostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('mongo/posts')
export class MongoPostsController {
  constructor(private readonly postsService: MongoPostsService) {}

  @MessagePattern('createPost')
  create(@Payload() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @MessagePattern('findAllPosts')
  findAll() {
    return this.postsService.findAll();
  }

  @MessagePattern('findOnePost')
  findOne(@Payload() id: string) {
    return this.postsService.findOne(id);
  }
}
