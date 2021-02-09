import { Module } from '@nestjs/common';

import { SampleController } from '@server/Page/controllers/SampleController';
import { InfoController } from '@server/Page/controllers/InfoController';
import { IndexController } from '@server/Page/controllers/IndexController';
import { AboutModule } from '@server/About/AboutModule';
import { SamplePageService } from '@server/Page/services/SamplePageService';
import { SamplePageServiceMock } from '@server/Page/__mock__/SamplePageServiceMock';
import { MainModule } from '@server/Main/MainModule';
import { InfoModule } from '@server/Info/InfoModule';
import { InfoPageService } from '@server/Page/services/InfoPageService';
import { InfoPageServiceMock } from '@server/Page/__mock__/InfoPageServiceMock';
import { IndexPageService } from '@server/Page/services/IndexPageService';
import { IndexPageServiceMock } from '@server/Page/__mock__/IndexPageServiceMock';

@Module({
  imports: [AboutModule, MainModule, InfoModule],
  providers: [
    {
      provide: SamplePageService,
      useClass: SamplePageServiceMock,
    },
    {
      provide: InfoPageService,
      useClass: InfoPageServiceMock,
    },
    {
      provide: IndexPageService,
      useClass: IndexPageServiceMock,
    },
  ],
  controllers: [IndexController, SampleController, InfoController],
})
export class PageModule {}
