import { Module } from '@nestjs/common';
import { ConfigModule as ConfigModuleNest } from '@nestjs/config';
import { RenderModule } from 'nest-next';
import Next from 'next';

import path from 'path';

import { PageModule } from '@server/page/PageModule';
import { StorybookModule } from '@server/storybook/StorybookModule';
import { ConfigModule } from '@server/config/ConfigModule';
import { NodeEnvs } from '@common/enums/NodeEnvs';

@Module({
  imports: [
    RenderModule.forRootAsync(
      Next({
        dev: process.env.NODE_ENV === NodeEnvs.DEVELOPMENT,
        dir: path.resolve(__dirname, '../..'),
      }),
    ),
    ConfigModuleNest.forRoot(),
    PageModule,
    StorybookModule,
    ConfigModule,
  ],
})
export class AppModule {}
