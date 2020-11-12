import { Module } from '@nestjs/common';

import { LoggerModule } from '@server/Logger/LoggerModule';
import { LoggerDefaultHandler } from '@server/ErrorFilter/services/LoggerHandler/LoggerDefaultHandler';
import { LoggerNotFoundHandler } from '@server/ErrorFilter/services/LoggerHandler/LoggerNotFoundHandler';
import { LoggerRequestValidationErrorHandler } from '@server/ErrorFilter/services/LoggerHandler/LoggerRequestValidationErrorHandler';
import { LoggerSystemErrorHandler } from '@server/ErrorFilter/services/LoggerHandler/LoggerSystemErrorHandler';
import { RestDefaultHandler } from '@server/ErrorFilter/services/RestHandler/RestDefaultHandler';
import { RestNotFoundHandler } from '@server/ErrorFilter/services/RestHandler/RestNotFoundHandler';
import { RestRequestValidationErrorHandler } from '@server/ErrorFilter/services/RestHandler/RestRequestValidationErrorHandler';
import { RestSystemErrorHandler } from '@server/ErrorFilter/services/RestHandler/RestSystemErrorHandler';
import { ErrorFilter } from '@server/ErrorFilter/services/ErrorFilter';
import { StatusCodeResolver } from '@server/ErrorFilter/services/StatusCodeResolver';
import { ErrorDtoFactory } from '@server/ErrorFilter/factories/ErrorDtoFactory';
import { ConfigModule } from '@server/Config/ConfigModule';

@Module({
  imports: [LoggerModule, ConfigModule],
  providers: [
    ErrorDtoFactory,
    LoggerDefaultHandler,
    LoggerNotFoundHandler,
    LoggerRequestValidationErrorHandler,
    LoggerSystemErrorHandler,
    RestDefaultHandler,
    RestNotFoundHandler,
    RestRequestValidationErrorHandler,
    RestSystemErrorHandler,
    ErrorFilter,
    StatusCodeResolver,
  ],
})
export class ErrorFilterModule {}
