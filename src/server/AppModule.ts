import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { RenderModule } from 'nest-next';
import Next from 'next';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as Transport from 'winston-transport';
import { format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';

import { PageModule } from '@server/Page/PageModule';
import { ConfigModule } from '@server/Config/ConfigModule';
import { ConfigService } from '@server/Config/services/ConfigService';
import { ConfigName } from '@common/enums/ConfigName';
import { LoggerMiddleware } from '@server/Logger/middlewares/LoggerMiddleware';
import { ErrorFilterModule } from '@server/ErrorFilter/ErrorFilterModule';
import { LoggerModule } from '@server/Logger/LoggerModule';
import { SystemValidationErrorModule } from '@server/SystemValidationError/SystemValidationErrorModule';
import { ErrorNextModule } from '@server/ErrorNext/ErrorNextModule';
import { TestReportModule } from '@server/TestReport/TestReportModule';
import { StorybookModule } from '@server/Storybook/StorybookModule';
import { SystemErrorModule } from '@server/SystemError/SystemErrorModule';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
        dir: process.cwd(),
      }),
    ),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const loggerTransports: Transport[] = [
          new DailyRotateFile({
            filename: 'cc-%DATE%.log',
            datePattern: 'YYYY-MM-DD-HH',
            maxSize: '20m',
            maxFiles: '7d',
            dirname: configService.get(ConfigName.NEST_LOG_PATH),
          }),
        ];

        if (!configService.getIsDisableConsoleLogger()) {
          loggerTransports.push(new transports.Console());
        }

        return {
          format: format.printf((info) => info.message),
          transports: loggerTransports,
        };
      },
    }),
    PageModule,
    ConfigModule,
    ErrorFilterModule,
    LoggerModule,
    SystemValidationErrorModule,
    ErrorNextModule,
    TestReportModule,
    StorybookModule,
    SystemErrorModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).exclude('/storybook').forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
