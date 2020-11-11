/* eslint @typescript-eslint/no-explicit-any: off, @typescript-eslint/no-unsafe-return: off */
import { get } from 'lodash';

import { SystemErrors } from '@common/enums/SystemErrors';
import { INormalizedData } from '@server/ErrorFilter/interfaces/INormilezedData';

export class ErrorDto {
  private code: SystemErrors;

  private data: Record<string, unknown>;

  private message: string;

  private err: any;

  public normalize(): INormalizedData {
    return {
      code: this.getCode(),
      data: this.getData(),
      name: get(this.getError(), 'name'),
      message: get(this.getError(), 'message'),
      stack: get(this.getError(), 'stack'),
      error: this.err,
    };
  }

  public getCode(): SystemErrors {
    return this.code;
  }

  public setCode(code: SystemErrors): this {
    this.code = code;

    return this;
  }

  public getData(): Record<string, unknown> {
    return this.data;
  }

  public setData(data: Record<string, unknown>): this {
    this.data = data;

    return this;
  }

  public getMessage(): string {
    return this.message;
  }

  public setMessage(message: string): this {
    this.message = message;

    return this;
  }

  public getError(): any {
    return this.err;
  }

  public setError<Error>(err: Error): this {
    this.err = err;

    return this;
  }
}
