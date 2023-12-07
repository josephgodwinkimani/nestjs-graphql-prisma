import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  text: string;

  @Prop()
  isPublished: boolean;

  @Prop()
  authorId: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
