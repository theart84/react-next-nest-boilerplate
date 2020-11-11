import { CustomError } from 'ts-custom-error';

import { SystemErrors } from '@common/enums/SystemErrors';

export class SystemError extends CustomError {
  private systemCode: SystemErrors;

  private systemAdditionalData: Record<string, unknown>;

  public constructor(message?: string) {
    super(message);

    Error.captureStackTrace(this, SystemError);
  }

  public getSystemCode(): SystemErrors {
    return this.systemCode;
  }

  public setSystemCode(systemCode: SystemErrors): void {
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
