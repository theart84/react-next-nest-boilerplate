/* eslint import/order: off, import/first: off */
import { config } from 'dotenv';

config();

import { NestFactory } from '@nestjs/core';

import { AppModule } from '@server/AppModule';
import { ConfigModule } from '@server/config/ConfigModule';
import { ConfigNames } from '@common/enums/ConfigNames';
import { ConfigService } from '@server/config/ConfigService';

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  const configService = app
    .select<ConfigModule>(ConfigModule)
    .get(ConfigService);

  const appPort = configService.get(ConfigNames.NEST_SERVER_PORT);

  await app.listen(appPort);
})();
