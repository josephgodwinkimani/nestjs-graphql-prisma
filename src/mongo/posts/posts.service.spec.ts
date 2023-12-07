import { Test, TestingModule } from '@nestjs/testing';
import { MongoPostsService } from './posts.service';

describe('MongoPostsService', () => {
  let service: MongoPostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoPostsService],
    }).compile();

    service = module.get<MongoPostsService>(MongoPostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
