import { Module } from '@nestjs/common';

import { AboutFetcher } from '@server/About/services/AboutFetcher';
import { AboutFetcherMock } from '@server/About/__mock__/AboutFetcherMock';

@Module({
  providers: [
    {
      provide: AboutFetcher,
      useValue: new AboutFetcherMock(),
    },
  ],
  exports: [AboutFetcher],
})
export class AboutModule {}
