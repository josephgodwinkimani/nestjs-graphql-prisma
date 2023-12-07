import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UsersService } from './users.service';
// import { CreateUserInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';
import { PubSub } from 'graphql-subscriptions';
import { NewUser, UpdateUser } from '../graphql';

const pubSub = new PubSub();

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('users')
  async users(): Promise<any> {
    return this.usersService.findAll();
  }

  @Query('user')
  async user(@Args('id') args: string): Promise<any> {
    return this.usersService.findOne(args);
  }

  @Mutation('createUser')
  async create(@Args('input') args: NewUser): Promise<any> {
    const createdUser = await this.usersService.create(args);
    pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Mutation('updateUser')
  async update(@Args('input') args: UpdateUser): Promise<any> {
    const updatedUser = await this.usersService.update(args);
    pubSub.publish('userUpdated', { userUpdated: updatedUser });
    return updatedUser;
  }

  @Mutation('deleteUser')
  async delete(@Args('id') args: string): Promise<any> {
    return this.usersService.delete(args);
  }

  @Subscription('userCreated')
  userCreated(): AsyncIterator<unknown, any, undefined> {
    return pubSub.asyncIterator('userCreated');
  }

  @Subscription('userUpdated')
  userUpdated(): AsyncIterator<unknown, any, undefined> {
    return pubSub.asyncIterator('userUpdated');
  }
}
