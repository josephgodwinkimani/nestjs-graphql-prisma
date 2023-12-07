import { Injectable } from '@nestjs/common';
import { Post } from '@prisma/client';
// import { CreatePostInput } from './dto/create-post.input';
// import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from '../prisma/prisma.service';
import { NewPost, UpdatePost } from '../graphql';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
  }

  async findAll(): Promise<Post[]> {
    return this.prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }

  async create(input: NewPost): Promise<Post> {
    const { authorId, ...params_without_authorId } = input;

    return this.prisma.post.create({
      data: {
        ...params_without_authorId,
        author: { connect: { id: authorId } },
      },
    });
  }

  async update(params: UpdatePost): Promise<Post> {
    const { id, ...params_without_id } = params;

    return this.prisma.post.update({
      where: {
        id,
      },
      data: {
        ...params_without_id,
      },
    });
  }

  async delete(id: string): Promise<Post> {
    return this.prisma.post.delete({
      where: {
        id,
      },
    });
  }
}
