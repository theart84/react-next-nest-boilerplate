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
import { ServeStaticModule } from '@nestjs/serve-static';

import { PageModule } from '@server/Page/PageModule';
import { ConfigModule } from '@server/Config/ConfigModule';
import { NodeEnv } from '@common/enums/NodeEnv';
import { ConfigService } from '@server/Config/services/ConfigService';
import { ConfigName } from '@common/enums/ConfigName';
import { LoggerMiddleware } from '@server/Logger/middlewares/LoggerMiddleware';
import { ErrorFilterModule } from '@server/ErrorFilter/ErrorFilterModule';
import { LoggerModule } from '@server/Logger/LoggerModule';
import { SystemValidationErrorModule } from '@server/SystemValidationError/SystemValidationErrorModule';
import { ErrorNextModule } from '@server/ErrorNext/ErrorNextModule';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV !== 'production',
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
            dirname: configService.get(ConfigName.NEST_LOG_PATH),
          }),
        ];

        if (configService.get(ConfigName.NODE_ENV) === NodeEnv.DEVELOPMENT) {
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
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '../..', 'storybook-static'),
      serveRoot: '/storybook',
    }),
    PageModule,
    ConfigModule,
    ErrorFilterModule,
    LoggerModule,
    SystemValidationErrorModule,
    ErrorNextModule,
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
