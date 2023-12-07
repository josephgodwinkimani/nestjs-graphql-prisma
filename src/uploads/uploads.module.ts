import { Module } from '@nestjs/common';
import { UploadsController } from './uploads.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UPLOAD_SERVICE } from './uploads.constants';
import { MulterModule } from '@nestjs/platform-express';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    ClientsModule.register([
      { name: UPLOAD_SERVICE, transport: Transport.TCP },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [UploadsController],
  providers: [PrismaService],
})
export class UploadsModule {}
