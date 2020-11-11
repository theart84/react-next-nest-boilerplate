import { ConfigService as NestConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

import { ConfigNames } from '@common/enums/ConfigNames';
import { IProcessEnv } from '@common/types/IProcessEnv';

@Injectable()
export class ConfigService {
  public constructor(private readonly nestConfigService: NestConfigService) {}

  public get<ConfigName extends ConfigNames>(
    name: ConfigName,
  ): IProcessEnv[ConfigName] {
    return this.nestConfigService.get<IProcessEnv[ConfigName]>(name);
  }
}
