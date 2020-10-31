import { ConfigService as NestConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { ConfigNames } from '@common/enums/ConfigNames';

@Injectable()
export class ConfigService {
  public constructor(private readonly nestConfigService: NestConfigService) {}

  public get<ConfigName extends ConfigNames>(
    name: ConfigNames,
  ): NodeJS.ProcessEnv[ConfigName] {
    return this.nestConfigService.get<NodeJS.ProcessEnv[ConfigName]>(name);
  }
}
