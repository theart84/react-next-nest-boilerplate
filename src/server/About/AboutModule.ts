import { Module } from '@nestjs/common';

import { AboutFetcher } from '@server/About/services/AboutFetcher';
import { AboutFetcherMock } from '@server/About/__mock__/AboutFetcherMock';
import { AboutCreator } from '@server/About/services/AboutCreator';
import { AboutCreatorMock } from '@server/About/__mock__/AboutCreatorMock';
import { AboutController } from '@server/About/AboutController';

@Module({
  providers: [
    {
      provide: AboutFetcher,
      useClass: AboutFetcherMock,
    },
    {
      provide: AboutCreator,
      useClass: AboutCreatorMock,
    },
  ],
  controllers: [AboutController],
  exports: [AboutFetcher],
})
export class AboutModule {}
