import {
  Body,
  Controller,
  Inject,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUploadDto } from './dto/create-upload.dto';
// import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UPLOAD_SERVICE } from './uploads.constants';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { Observable } from 'rxjs';
import { UpdateUploadDto } from './dto/update-upload.dto';

@Controller()
export class UploadsController {
  constructor(
    @Inject(UPLOAD_SERVICE) private readonly client: ClientProxy,
    private prisma: PrismaService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const randomName = 'image';
          const extension = extname(file.originalname);
          cb(null, `${randomName}${extension}`);
        },
      }),
    }),
  )
  async uploadFile(
    @Body() body: CreateUploadDto,
    @UploadedFile() file,
  ): Promise<any> {
    const filePath = file.path;
    const result = await this.prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        path: filePath,
      },
    });
    return result;
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFileAndReport(
    @Body() body: CreateUploadDto,
    @UploadedFile() file: Express.Multer.File,
  ): Observable<Promise<any>> {
    const data = {
      body,
      file: file.path,
    };
    return this.client.send<Promise<any>>('updateUserOnFileUpload', data);
  }

  @MessagePattern('updateUserOnFileUpload')
  async updateUser(@Payload() body: UpdateUploadDto): Promise<any> {
    const result = await this.prisma.user.update({
      where: {
        id: body.id,
      },
      data: {
        path: body.filePath,
      },
    });
    return result;
  }
}
