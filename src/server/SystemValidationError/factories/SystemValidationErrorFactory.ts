import { ValidationError, Injectable } from '@nestjs/common';

import { SystemValidationError } from '@server/SystemValidationError/dto/SystemValidationError';

@Injectable()
export class SystemValidationErrorFactory {
  public create(errors: ValidationError[]): SystemValidationError {
    return new SystemValidationError(errors);
  }
}
