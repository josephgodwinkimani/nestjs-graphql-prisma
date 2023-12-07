import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = await service.findOne(
        '3f234751-1819-4d96-ad0b-29840796806d',
      );
      expect(user).toBeDefined();
      expect(user.id).toEqual('3f234751-1819-4d96-ad0b-29840796806d');
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toBeDefined();
      expect(users.length).toBeGreaterThan(0);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'James Koome',
        email: 'jameskoome0@yahoo.com',
      };
      const user = await service.create(newUser);
      expect(user).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.name).toEqual(newUser.name);
      expect(user.email).toEqual(newUser.email);
    });
  });

  describe('update', () => {
    it('should update a user by id', async () => {
      const updateUser = {
        id: '3f234751-1819-4d96-ad0b-29840796806d',
        name: 'James Koome',
        email: 'jameskoome0@yahoo.com',
      };
      const user = await service.update(updateUser);
      expect(user).toBeDefined();
      expect(user.id).toEqual(updateUser.id);
      expect(user.name).toEqual(updateUser.name);
    });
  });

  describe('delete', () => {
    it('should delete a user by id', async () => {
      const user = await service.delete('3f234751-1819-4d96-ad0b-29840796806d');
      expect(user).toBeDefined();
      expect(user.id).toEqual('3f234751-1819-4d96-ad0b-29840796806d');
    });
  });
});
