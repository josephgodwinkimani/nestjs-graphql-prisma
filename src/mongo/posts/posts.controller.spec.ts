import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from 'src/posts/posts.service';
import { MongoPostsController } from './posts.controller';

describe('MongoPostsController', () => {
  let controller: MongoPostsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MongoPostsController],
      providers: [PostsService],
    }).compile();

    controller = module.get<MongoPostsController>(MongoPostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
