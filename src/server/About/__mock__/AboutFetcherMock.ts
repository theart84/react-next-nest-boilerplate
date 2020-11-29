import { Injectable } from '@nestjs/common';

import { IAbout } from '@common/api/dto/About/IAbout';
import { AboutFetcher } from '@server/About/services/AboutFetcher';

@Injectable()
export class AboutFetcherMock implements AboutFetcher {
  public getAbout(): IAbout {
    return {
      name: 'Mock name from backend',
      surname: 'Mock surname from backend',
    };
  }
}
