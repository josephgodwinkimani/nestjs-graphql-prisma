import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}
