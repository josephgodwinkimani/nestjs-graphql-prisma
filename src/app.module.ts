import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MathModule } from './math/math.module';
import { UploadsModule } from './uploads/uploads.module';
import { MongoPostsModule } from './mongo/posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@0.0.0.0:27017/test`,
    ),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      introspection: process.env.NODE_ENV !== 'production' ? true : false,
      installSubscriptionHandlers: true,
    }),
    UsersModule,
    PostsModule,
    MathModule,
    UploadsModule,
    MongoPostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
