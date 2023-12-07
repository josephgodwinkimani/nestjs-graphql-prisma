import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class MongoPostsService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = await this.postModel.create(createPostDto);
    return createdPost;
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findOne({ _id: id }).exec();
  }

  async delete(id: string) {
    const deletedCat = await this.postModel
      .findByIdAndRemove({ _id: id })
      .exec();
    return deletedCat;
  }
}
