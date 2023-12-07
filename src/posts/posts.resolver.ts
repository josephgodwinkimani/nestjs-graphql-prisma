import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { PostsService } from './posts.service';
// import { CreatePostInput } from './dto/create-post.input';
// import { UpdatePostInput } from './dto/update-post.input';
import { PubSub } from 'graphql-subscriptions';
import { NewPost, UpdatePost } from '../graphql';

const pubSub = new PubSub();

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postService: PostsService) {}

  @Query('posts')
  async posts(): Promise<any> {
    return this.postService.findAll();
  }

  @Query('post')
  async post(@Args('id') args: string): Promise<any> {
    return this.postService.findOne(args);
  }

  @Mutation('createPost')
  async create(@Args('input') args: NewPost): Promise<any> {
    const createdPost = await this.postService.create(args);
    pubSub.publish('postCreated', { postCreated: createdPost });
    return createdPost;
  }

  @Mutation('updatePost')
  async update(@Args('input') args: UpdatePost): Promise<any> {
    return this.postService.update(args);
  }

  @Mutation('deletePost')
  async delete(@Args('id') args: string): Promise<any> {
    return this.postService.delete(args);
  }

  @Subscription('postCreated')
  postCreated(): AsyncIterator<unknown, any, undefined> {
    return pubSub.asyncIterator('postCreated');
  }
}
