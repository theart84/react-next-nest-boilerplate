import { Injectable } from '@nestjs/common';

import { ErrorCode } from '@common/enums/ErrorCode';
import { SystemError } from '@server/SystemError/dto/SystemError';

@Injectable()
export class SystemErrorFactory {
  public create(
    errorCode: ErrorCode,
    message = '',
    data: Record<string, unknown> = {},
  ): SystemError {
    const systemError = new SystemError(message);

    systemError.setSystemCode(errorCode);
    systemError.setSystemAdditionalData(data);

    return systemError;
  }
}
