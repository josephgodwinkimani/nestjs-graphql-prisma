import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { MATH_SERVICE } from './math.constants';
import { MicroServiceExceptionFilter } from '../common/filters/rpc-exception.filter';

@Controller('math')
export class MathController {
  constructor(@Inject(MATH_SERVICE) private readonly client: ClientProxy) {}

  @Get()
  execute(): Observable<number> {
    try {
      const pattern = { cmd: 'sum' };
      const data = [1, 2, 3, 4, 5];
      return this.client.send<number>(pattern, data);
    } catch (e) {
      throw new MicroServiceExceptionFilter();
    }
  }

  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    return (data || []).reduce((a, b) => a + b);
  }
}
