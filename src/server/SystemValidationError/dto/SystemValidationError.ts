import { ValidationError } from '@nestjs/common';

export class SystemValidationError extends Error {
  public constructor(private readonly errors: ValidationError[]) {
    super();
  }

  public getErrors(): ValidationError[] {
    return this.errors;
  }
}
