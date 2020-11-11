import { Injectable } from '@nestjs/common';

import { NodeEnvs } from '@common/enums/NodeEnvs';
import { ConfigService } from '@server/Config/services/ConfigService';
import { ConfigNames } from '@common/enums/ConfigNames';
import { SystemErrors } from '@common/enums/SystemErrors';
import { ErrorDto } from '@server/ErrorFilter/dto/ErrorDto';

@Injectable()
export class ErrorDtoFactory {
  private readonly nodeEnv: NodeEnvs;

  public constructor(private readonly configService: ConfigService) {
    this.nodeEnv = configService.get(ConfigNames.NODE_ENV);
  }

  public create<Error>(
    err: Error,
    code: SystemErrors,
    message = '',
    data: Record<string, unknown> = {},
  ): ErrorDto {
    const dto = new ErrorDto();

    dto.setCode(code).setError(err);

    if (this.nodeEnv === NodeEnvs.DEVELOPMENT) {
      dto.setData(data).setMessage(message);
    }

    return dto;
  }
}
