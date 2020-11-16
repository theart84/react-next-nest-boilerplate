import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { RenderModule } from 'nest-next';
import Next from 'next';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as Transport from 'winston-transport';
import { format, transports } from 'winston';
import { WinstonModule } from 'nest-winston';
import path from 'path';

import { PageModule } from '@server/Page/PageModule';
import {
  STORYBOOK_SERVER_ROOT,
  StorybookModule,
} from '@server/Storybook/StorybookModule';
import { ConfigModule } from '@server/Config/ConfigModule';
import { NodeEnvs } from '@common/enums/NodeEnvs';
import { ConfigService } from '@server/Config/services/ConfigService';
import { ConfigNames } from '@common/enums/ConfigNames';
import { LoggerMiddleware } from '@server/Logger/middlewares/LoggerMiddleware';
import { ErrorFilterModule } from '@server/ErrorFilter/ErrorFilterModule';
import { LoggerModule } from '@server/Logger/LoggerModule';
import { SystemValidationErrorModule } from '@server/SystemValidationError/SystemValidationErrorModule';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV === NodeEnvs.DEVELOPMENT,
        dir: path.resolve(__dirname, '../..'),
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
            dirname: configService.get(ConfigNames.NEST_LOG_PATH),
          }),
        ];

        if (configService.get(ConfigNames.NODE_ENV) === NodeEnvs.DEVELOPMENT) {
          loggerTransports.push(new transports.Console());
        }

        return {
          format: format.printf((info) => info.message),
          transports: loggerTransports,
        };
      },
    }),
    NestConfigModule.forRoot({
      envFilePath: path.resolve(__dirname, '../../.env'),
    }),
    PageModule,
    StorybookModule,
    ConfigModule,
    ErrorFilterModule,
    LoggerModule,
    SystemValidationErrorModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).exclude(STORYBOOK_SERVER_ROOT).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
