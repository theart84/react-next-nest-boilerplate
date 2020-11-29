import { Module } from '@nestjs/common';

import { SampleController } from '@server/Page/controllers/SampleController';
import { InfoController } from '@server/Page/controllers/InfoController';
import { IndexController } from '@server/Page/controllers/IndexController';
import { AboutModule } from '@server/About/AboutModule';

@Module({
  imports: [AboutModule],
  controllers: [IndexController, SampleController, InfoController],
})
export class PageModule {}
