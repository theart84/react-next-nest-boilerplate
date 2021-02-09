import { Injectable } from '@nestjs/common';

import { ConfigService } from '@server/Config/services/ConfigService';
import { ErrorCode } from '@common/enums/ErrorCode';
import { ErrorDto } from '@server/ErrorFilter/dto/ErrorDto';

@Injectable()
export class ErrorDtoFactory {
  private readonly isDev: boolean;

  public constructor(private readonly configService: ConfigService) {
    this.isDev = configService.getIsDev();
  }

  public create<Error>(
    err: Error,
    code: ErrorCode,
    message = '',
    payload: unknown = {},
  ): ErrorDto {
    const dto = new ErrorDto(err, this.isDev);

    dto.code = code;
    dto.message = message;
    dto.payload = payload;

    return dto;
  }
}
