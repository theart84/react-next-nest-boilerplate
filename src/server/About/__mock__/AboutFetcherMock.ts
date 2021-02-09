import { Injectable } from '@nestjs/common';

import { IAbout } from '@common/api/dto/About/IAbout';
import { AboutFetcher } from '@server/About/services/AboutFetcher';

@Injectable()
export class AboutFetcherMock implements AboutFetcher {
  public getAbout(): IAbout {
    return {
      name: 'Hello from selenium test',
      surname: 'Mock surname from backend',
    };
  }
}
