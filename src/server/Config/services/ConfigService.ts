import { ConfigService as NestConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';

import { CONFIGURATION_SERVICE_TOKEN } from '@nestjs/config/dist/config.constants';

import { ConfigNames } from '@common/enums/ConfigNames';

@Injectable()
export class ConfigService {
  public constructor(
    @Inject(CONFIGURATION_SERVICE_TOKEN)
    private readonly nestConfigService: NestConfigService,
  ) {}

  public get<ConfigName extends ConfigNames>(
    name: ConfigName,
  ): NodeJS.ProcessEnv[ConfigName] {
    return this.nestConfigService.get<NodeJS.ProcessEnv[ConfigName]>(name);
  }
}
