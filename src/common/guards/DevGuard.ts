import { CanActivate, Injectable } from '@nestjs/common';

import { SystemErrorFactory } from '@server/SystemError/factories/SystemErrorFactory';
import { ErrorCode } from '@common/enums/ErrorCode';
import { ConfigService } from '@server/Config/services/ConfigService';

@Injectable()
export class DevGuard implements CanActivate {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly configService: ConfigService,
  ) {}

  public canActivate(): boolean {
    if (this.configService.getIsDev()) {
      return true;
    }

    throw this.systemErrorFactory.create(ErrorCode.FORBIDDEN);
  }
}
