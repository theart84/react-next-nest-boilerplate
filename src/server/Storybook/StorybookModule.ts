import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import path from 'path';

export const STORYBOOK_SERVER_ROOT = '/storybook';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '../../..', 'storybook-static'),
      serveRoot: STORYBOOK_SERVER_ROOT,
    }),
  ],
})
export class StorybookModule {}
