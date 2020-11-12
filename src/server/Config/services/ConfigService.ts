import { ConfigService as NestConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

import { CONFIGURATION_SERVICE_TOKEN } from '@nestjs/config/dist/config.constants';

import { ConfigNames } from '@common/enums/ConfigNames';
import { IProcessEnv } from '@common/types/IProcessEnv';

@Injectable()
export class ConfigService {
  public constructor(
    @Inject(CONFIGURATION_SERVICE_TOKEN)
    private readonly nestConfigService: NestConfigService,
  ) {}

  public get<ConfigName extends ConfigNames>(
    name: ConfigName,
  ): IProcessEnv[ConfigName] {
    return this.nestConfigService.get<IProcessEnv[ConfigName]>(name);
  }
}
