import { Body, Controller, Post } from '@nestjs/common';

import { ErrorNextBody } from '@common/api/dto/ErrorNext/ErrorNextBody';
import { ErrorNextRoute } from '@server/ErrorNext/enums/ErrorNextRoute';

@Controller()
export class ErrorNextController {
  @Post(ErrorNextRoute.SEND_ERROR)
  public sendError(@Body() error: ErrorNextBody): void {
    // TODO: отправлять ошибки в сервис fluentd
    // eslint-disable-next-line no-console
    console.log(error);
  }
}
