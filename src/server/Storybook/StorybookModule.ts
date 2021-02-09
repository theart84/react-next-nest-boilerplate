import { Module } from '@nestjs/common';

import { StorybookController } from '@server/Storybook/controllers/StorybookController';

@Module({
  controllers: [StorybookController],
})
export class StorybookModule {}
