import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
// import { CreateUserInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { NewUser, UpdateUser } from '../graphql';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: { posts: true },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  async create(input: NewUser) {
    return this.prisma.user.create({
      data: input,
    });
  }

  async update(params: UpdateUser): Promise<User> {
    const { id, ...params_without_id } = params;

    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        ...params_without_id,
      },
    });
  }

  async delete(id: string): Promise<User> {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
