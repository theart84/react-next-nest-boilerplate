import { Module } from '@nestjs/common';

import { MainFetcher } from '@server/Main/services/MainFetcher';
import { MainFetcherMock } from '@server/Main/__mock__/MainFetcherMock';

@Module({
  providers: [
    {
      provide: MainFetcher,
      useClass: MainFetcherMock,
    },
  ],
  exports: [MainFetcher],
})
export class MainModule {}
