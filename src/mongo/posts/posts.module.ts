import { Module } from '@nestjs/common';
import { MongoPostsService } from './posts.service';
import { MongoPostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
  ],
  controllers: [MongoPostsController],
  providers: [MongoPostsService],
})
export class MongoPostsModule {}
