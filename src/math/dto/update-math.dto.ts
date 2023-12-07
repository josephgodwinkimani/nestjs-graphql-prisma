import { PartialType } from '@nestjs/mapped-types';
import { CreateMathDto } from './create-math.dto';

export class UpdateMathDto extends PartialType(CreateMathDto) {
  id: number;
}
