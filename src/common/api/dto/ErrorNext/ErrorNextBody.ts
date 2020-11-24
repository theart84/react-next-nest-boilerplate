import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

import { ErrorNextItem } from '@common/api/dto/ErrorNext/ErrorNextItem';

export class ErrorNextBody {
  @Type(() => ErrorNextItem)
  @ValidateNested({ each: true })
  public errors!: ErrorNextItem[];
}
