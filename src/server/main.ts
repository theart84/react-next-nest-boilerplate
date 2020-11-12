/* eslint import/order: off, import/first: off */
import { config } from 'dotenv';
import path from 'path';

config({
  path: path.resolve(__dirname, '../../.env'),
});

import { NestFactory } from '@nestjs/core';
import { RenderFilter } from 'nest-next';

import { AppModule } from '@server/AppModule';
import { ConfigModule } from '@server/Config/ConfigModule';
import { ConfigNames } from '@common/enums/ConfigNames';
import { ConfigService } from '@server/Config/services/ConfigService';
import { ErrorFilterModule } from '@server/ErrorFilter/ErrorFilterModule';
import { ErrorFilter } from '@server/ErrorFilter/services/ErrorFilter';
import { ValidationPipe } from '@nestjs/common';
import { SystemValidationErrorModule } from '@server/SystemValidationError/SystemValidationErrorModule';
import { SystemValidationErrorFactory } from '@server/SystemValidationError/factories/SystemValidationErrorFactory';

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  const errorFilter = app.select(ErrorFilterModule).get(ErrorFilter);

  const configService = app.select(ConfigModule).get(ConfigService);

  const renderFilter = app.get(RenderFilter);

  const validationErrorFactory = app
    .select(SystemValidationErrorModule)
    .get(SystemValidationErrorFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationErrorFactory.create.bind(
        validationErrorFactory,
      ),
      whitelist: false,
      transform: true,
      skipMissingProperties: false,
      validationError: {
        target: false,
      },
    }),
  );

  errorFilter.setRenderFilter(renderFilter);

  app.useGlobalFilters(errorFilter);

  const appPort = configService.get(ConfigNames.NEST_SERVER_PORT);

  await app.listen(appPort);
})();
