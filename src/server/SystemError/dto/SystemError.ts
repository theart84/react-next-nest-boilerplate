import { CustomError } from 'ts-custom-error';

import { ErrorCodes } from '@common/enums/ErrorCodes';

export class SystemError extends CustomError {
  private systemCode: ErrorCodes;

  private systemAdditionalData: Record<string, unknown>;

  public constructor(message?: string) {
    super(message);

    Error.captureStackTrace(this, SystemError);
  }

  public getSystemCode(): ErrorCodes {
    return this.systemCode;
  }

  public setSystemCode(systemCode: ErrorCodes): void {
    this.systemCode = systemCode;
  }

  public getMessage(): string {
    return this.message;
  }

  public getSystemAdditionalData(): Record<string, unknown> {
    return this.systemAdditionalData;
  }

  public setSystemAdditionalData<Data>(
    systemAdditionalData: Record<string, Data>,
  ): void {
    this.systemAdditionalData = systemAdditionalData;
  }
}
