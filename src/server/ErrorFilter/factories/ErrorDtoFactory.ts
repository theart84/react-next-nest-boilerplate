import { Injectable } from '@nestjs/common';

import { NodeEnv } from '@common/enums/NodeEnv';
import { ConfigService } from '@server/Config/services/ConfigService';
import { ConfigName } from '@common/enums/ConfigName';
import { ErrorCode } from '@common/enums/ErrorCode';
import { ErrorDto } from '@server/ErrorFilter/dto/ErrorDto';

@Injectable()
export class ErrorDtoFactory {
  private readonly nodeEnv: NodeEnv;

  public constructor(private readonly configService: ConfigService) {
    this.nodeEnv = configService.get(ConfigName.NODE_ENV);
  }

  public create<Error>(
    err: Error,
    code: ErrorCode,
    message = '',
    payload: unknown = {},
  ): ErrorDto {
    const dto = new ErrorDto(err, this.nodeEnv === NodeEnv.DEVELOPMENT);

    dto.code = code;
    dto.message = message;
    dto.payload = payload;

    return dto;
  }
}
