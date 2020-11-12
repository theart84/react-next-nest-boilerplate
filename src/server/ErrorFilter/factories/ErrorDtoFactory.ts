import { Injectable } from '@nestjs/common';

import { NodeEnvs } from '@common/enums/NodeEnvs';
import { ConfigService } from '@server/Config/services/ConfigService';
import { ConfigNames } from '@common/enums/ConfigNames';
import { ErrorCodes } from '@common/enums/ErrorCodes';
import { ErrorDto } from '@server/ErrorFilter/dto/ErrorDto';

@Injectable()
export class ErrorDtoFactory {
  private readonly nodeEnv: NodeEnvs;

  public constructor(private readonly configService: ConfigService) {
    this.nodeEnv = configService.get(ConfigNames.NODE_ENV);
  }

  public create<Error>(
    err: Error,
    code: ErrorCodes,
    message = '',
    payload: unknown = {},
  ): ErrorDto {
    const dto = new ErrorDto(err, this.nodeEnv === NodeEnvs.DEVELOPMENT);

    dto.code = code;
    dto.message = message;
    dto.payload = payload;

    return dto;
  }
}
