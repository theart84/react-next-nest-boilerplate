import { Injectable } from '@nestjs/common';

import { ErrorCodes } from '@common/enums/ErrorCodes';
import { SystemError } from '@server/SystemError/dto/SystemError';

@Injectable()
export class SystemErrorFactory {
  public create(
    errorCode: ErrorCodes,
    message = '',
    data: Record<string, unknown> = {},
  ): SystemError {
    const systemError = new SystemError(message);

    systemError.setSystemCode(errorCode);
    systemError.setSystemAdditionalData(data);

    return systemError;
  }
}
