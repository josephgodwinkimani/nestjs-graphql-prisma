import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MathModule } from './math/math.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      typePaths: ['./**/*.graphql'],
      introspection: process.env.NODE_ENV !== 'production' ? true : false,
      installSubscriptionHandlers: true,
    }),
    UsersModule,
    PostsModule,
    MathModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
