import { ConfigService as NestConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

import { CONFIGURATION_SERVICE_TOKEN } from '@nestjs/config/dist/config.constants';

import { ConfigName } from '@common/enums/ConfigName';
import { SystemErrorFactory } from '@server/SystemError/factories/SystemErrorFactory';
import { ErrorCode } from '@common/enums/ErrorCode';

@Injectable()
export class ConfigService {
  public constructor(
    @Inject(CONFIGURATION_SERVICE_TOKEN)
    private readonly nestConfigService: NestConfigService,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  public get<ConfigItem extends ConfigName>(
    name: ConfigItem,
  ): NodeJS.ProcessEnv[ConfigItem] {
    const configParam = this.nestConfigService.get<
      NodeJS.ProcessEnv[ConfigItem]
    >(name);

    if (!configParam) {
      throw this.systemErrorFactory.create(ErrorCode.CONFIG_PARAM_NOT_FOUND);
    }

    return configParam;
  }
}
