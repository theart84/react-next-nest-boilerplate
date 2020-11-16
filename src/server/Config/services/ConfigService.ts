import { ConfigService as NestConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

import { CONFIGURATION_SERVICE_TOKEN } from '@nestjs/config/dist/config.constants';

import { ConfigNames } from '@common/enums/ConfigNames';
import { SystemErrorFactory } from '@server/SystemError/factories/SystemErrorFactory';
import { ErrorCodes } from '@common/enums/ErrorCodes';

@Injectable()
export class ConfigService {
  public constructor(
    @Inject(CONFIGURATION_SERVICE_TOKEN)
    private readonly nestConfigService: NestConfigService,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  public get<ConfigName extends ConfigNames>(
    name: ConfigName,
  ): NodeJS.ProcessEnv[ConfigName] {
    const configParam = this.nestConfigService.get<
      NodeJS.ProcessEnv[ConfigName]
    >(name);

    if (!configParam) {
      throw this.systemErrorFactory.create(ErrorCodes.CONFIG_PARAM_NOT_FOUND);
    }

    return configParam;
  }
}
