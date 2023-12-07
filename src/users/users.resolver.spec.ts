import { Test, TestingModule } from '@nestjs/testing';
import { PubSub } from 'graphql-subscriptions';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;
  let pubSub: PubSub;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
    pubSub = new PubSub();
  });

  describe('users', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: '3f234751-1819-4d96-ad0b-29840796806d',
          name: 'James Koome',
          email: 'jameskoome0@yahoo.com',
          path: '/uploads/profile-pic.jpeg',
        },
      ];
      jest.spyOn(service, 'findAll').mockResolvedValue(users);

      expect(await resolver.users()).toBe(users);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('user', () => {
    it('should return a user by id', async () => {
      const user = {
        id: '3f234751-1819-4d96-ad0b-29840796806d',
        name: 'James Koome',
        email: 'jameskoome0@yahoo.com',
        path: '/uploads/profile-pic.jpeg',
      };
      jest.spyOn(service, 'findOne').mockResolvedValue(user);

      expect(await resolver.user('1')).toBe(user);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a user and publish a userCreated event', async () => {
      const input = {
        name: 'James Koome',
        email: 'jameskoome0@yahoo.com',
        path: null,
      };
      const createdUser = { id: '1', ...input };
      jest.spyOn(service, 'create').mockResolvedValue(createdUser);
      //const publishSpy = jest.spyOn(pubSub, 'publish');

      expect(await resolver.create(input)).toBe(createdUser);
      expect(service.create).toHaveBeenCalledWith(input);
      /*expect(publishSpy).toHaveBeenCalledWith('userCreated', {
        userCreated: createdUser,
      });*/
    });
  });

  describe('update', () => {
    it('should update a user and publish a userUpdated event', async () => {
      const input = {
        id: '3f234751-1819-4d96-ad0b-29840796806d',
        name: 'James Koome',
        email: 'jameskoome0@yahoo.com',
        path: '/uploads/profile-pic.jpeg',
      };
      const updatedUser = { id: '1', ...input };
      jest.spyOn(service, 'update').mockResolvedValue(updatedUser);
      //const publishSpy = jest.spyOn(pubSub, 'publish');

      expect(await resolver.update(input)).toBe(updatedUser);
      expect(service.update).toHaveBeenCalledWith(input);
      /*expect(publishSpy).toHaveBeenCalledWith('userUpdated', {
        userUpdated: updatedUser,
      });*/
    });
  });

  describe('delete', () => {
    it('should delete a user by id', async () => {
      const input = {
        id: '3f234751-1819-4d96-ad0b-29840796806d',
        name: 'James Koome',
        email: 'jameskoome0@yahoo.com',
        path: '/uploads/profile-pic.jpeg',
      };
      jest.spyOn(service, 'delete').mockResolvedValue(input);

      expect(
        await resolver.delete('3f234751-1819-4d96-ad0b-29840796806de'),
      ).toBe(input);
      expect(service.delete).toHaveBeenCalled();
    });
  });

  describe('userCreated', () => {
    it('should return an async iterator of userCreated events', () => {
      const userCreated = {
        id: '3f234751-1819-4d96-ad0b-29840796806d',
        name: 'James Koome',
        email: 'jameskoome0@yahoo.com',
      };
      const asyncIterator = resolver.userCreated();
      pubSub.publish('userCreated', { userCreated });

      expect(asyncIterator.next()).resolves.toEqual({
        value: { userCreated },
        done: false,
      });
    });
  });

  describe('userUpdated', () => {
    it('should return an async iterator of userUpdated events', () => {
      const userUpdated = {
        id: '3f234751-1819-4d96-ad0b-29840796806d',
        name: 'James Koome',
        email: 'jameskoome0@yahoo.com',
      };
      const asyncIterator = resolver.userUpdated();
      pubSub.publish('userUpdated', { userUpdated });

      expect(asyncIterator.next()).resolves.toEqual({
        value: { userUpdated },
        done: false,
      });
    });
  });
});
