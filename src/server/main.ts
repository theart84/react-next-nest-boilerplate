/* eslint import/order: off, import/first: off */
import { load } from 'dotenv-extended';
import path from 'path';

load({
  path: path.resolve(process.cwd(), '.env.local'),
  defaults: path.resolve(process.cwd(), '.env'),
});

import { NestFactory } from '@nestjs/core';
import { RenderFilter } from 'nest-next';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from '@server/AppModule';
import { ConfigModule } from '@server/Config/ConfigModule';
import { ConfigName } from '@common/enums/ConfigName';
import { ConfigService } from '@server/Config/services/ConfigService';
import { ErrorFilterModule } from '@server/ErrorFilter/ErrorFilterModule';
import { ErrorFilter } from '@server/ErrorFilter/services/ErrorFilter';
import { SystemValidationErrorModule } from '@server/SystemValidationError/SystemValidationErrorModule';
import { SystemValidationErrorFactory } from '@server/SystemValidationError/factories/SystemValidationErrorFactory';
import {
  APP_PUBLIC_URL,
  APP_TEST_REACT_TESTING_LIBRARY_URL,
} from '@common/utils/constants';

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);

  const configService = app.select(ConfigModule).get(ConfigService);

  const origin = configService.getIsDev()
    ? [APP_PUBLIC_URL, APP_TEST_REACT_TESTING_LIBRARY_URL]
    : APP_PUBLIC_URL;

  app.enableCors({
    origin,
    credentials: true,
  });

  const errorFilter = app.select(ErrorFilterModule).get(ErrorFilter);

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

  const appPort = configService.get(ConfigName.LOCAL_NEST_SERVER_PORT);

  await app.listen(appPort);
})();
