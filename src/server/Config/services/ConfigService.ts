import { Injectable } from '@nestjs/common';

import { ConfigName } from '@common/enums/ConfigName';
import { SystemErrorFactory } from '@server/SystemError/factories/SystemErrorFactory';
import { ErrorCode } from '@common/enums/ErrorCode';
import { NodeEnv } from '@common/enums/NodeEnv';

@Injectable()
export class ConfigService {
  public constructor(private readonly systemErrorFactory: SystemErrorFactory) {}

  public get<ConfigItem extends ConfigName>(
    name: ConfigItem,
  ): NodeJS.ProcessEnv[ConfigItem] {
    const configParam = process.env[name];

    if (!configParam) {
      throw this.systemErrorFactory.create(ErrorCode.CONFIG_PARAM_NOT_FOUND);
    }

    return configParam;
  }

  public getIsDev(): boolean {
    return this.get(ConfigName.NODE_ENV) === NodeEnv.DEVELOPMENT;
  }

  public getIsProd(): boolean {
    return this.get(ConfigName.NODE_ENV) === NodeEnv.PRODUCTION;
  }

  public getIsDisableConsoleLogger(): boolean {
    return this.get(ConfigName.DISABLE_CONSOLE_LOGGER) === '1';
  }
}
