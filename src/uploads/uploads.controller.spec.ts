import { Test, TestingModule } from '@nestjs/testing';
import { UploadsController } from './uploads.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUploadDto } from './dto/create-upload.dto';
import { Observable } from 'rxjs';
import { UpdateUploadDto } from './dto/update-upload.dto';

describe('UploadsController', () => {
  let controller: UploadsController;
  let prismaService: PrismaService;
  let clientProxy: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UploadsController],
      providers: [
        PrismaService,
        {
          provide: ClientProxy,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UploadsController>(UploadsController);
    prismaService = module.get<PrismaService>(PrismaService);
    clientProxy = module.get<ClientProxy>(ClientProxy);
  });

  it('should upload a file and update user', async () => {
    const createUploadDto: CreateUploadDto = {
      id: '3f234751-1819-4d96-ad0b-29840796806d',
    };
    const file: Express.Multer.File = { path: 'file/path' };
    const updateUploadDto: UpdateUploadDto = {
      id: '3f234751-1819-4d96-ad0b-29840796806d',
      filePath: 'file/path',
    };

    jest.spyOn(prismaService, 'user').mockImplementation(() => ({
      update: jest.fn().mockResolvedValue(updateUploadDto),
    }));

    jest.spyOn(clientProxy, 'send').mockReturnValue(new Observable());

    const result = await controller.uploadFile(createUploadDto, file);
    expect(result).toEqual(updateUploadDto);
  });
});
