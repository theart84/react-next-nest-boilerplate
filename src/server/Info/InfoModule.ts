import { Module } from '@nestjs/common';

import { InfoFetcher } from '@server/Info/services/InfoFetcher';
import { InfoFetcherMock } from '@server/Info/__mock__/InfoFetcherMock';

@Module({
  providers: [
    {
      provide: InfoFetcher,
      useClass: InfoFetcherMock,
    },
  ],
  exports: [InfoFetcher],
})
export class InfoModule {}
