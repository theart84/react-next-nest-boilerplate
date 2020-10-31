import { Module } from '@nestjs/common';

import { SampleController } from '@server/page/SampleController';
import { InfoController } from '@server/page/InfoController';
import { IndexController } from '@server/page/IndexController';

@Module({
  controllers: [IndexController, SampleController, InfoController],
})
export class PageModule {}
