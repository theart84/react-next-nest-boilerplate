import { Injectable } from '@nestjs/common';

import { SystemErrors } from '@common/enums/SystemErrors';
import { SystemError } from '@server/SystemError/dto/SystemError';

@Injectable()
export class SystemErrorFactory {
  public create(
    systemErrorCode: SystemErrors,
    message = '',
    data: Record<string, unknown> = {},
  ): SystemError {
    const systemError = new SystemError(message);

    systemError.setSystemCode(systemErrorCode);
    systemError.setSystemAdditionalData(data);

    return systemError;
  }
}
