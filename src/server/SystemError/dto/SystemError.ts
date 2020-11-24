import { CustomError } from 'ts-custom-error';

import { ErrorCode } from '@common/enums/ErrorCode';

export class SystemError extends CustomError {
  private systemCode!: ErrorCode;

  private systemAdditionalData!: Record<string, unknown>;

  public constructor(message?: string) {
    super(message);

    Error.captureStackTrace(this, SystemError);
  }

  public getSystemCode(): ErrorCode {
    return this.systemCode;
  }

  public setSystemCode(systemCode: ErrorCode): void {
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
