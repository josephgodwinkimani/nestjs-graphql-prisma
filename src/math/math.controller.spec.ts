import { Test, TestingModule } from '@nestjs/testing';
import { MathController } from './math.controller';
import { MATH_SERVICE } from './math.constants';
import { ClientProxy } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('MathController', () => {
  let controller: MathController;
  let client: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MathController],
      providers: [
        {
          provide: MATH_SERVICE,
          useValue: {
            send: jest.fn(() => of(15)),
          },
        },
      ],
    }).compile();

    controller = module.get<MathController>(MathController);
    client = module.get<ClientProxy>(MATH_SERVICE);
  });

  describe('execute', () => {
    it('should return the sum of numbers', async () => {
      const result = await controller.execute().toPromise();
      expect(result).toBe(15);
      expect(client.send).toHaveBeenCalledWith({ cmd: 'sum' }, [1, 2, 3, 4, 5]);
    });
  });
});
