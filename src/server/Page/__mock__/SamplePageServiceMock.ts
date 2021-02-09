import { Injectable } from '@nestjs/common';

import { ISampleResponse } from '@common/api/dto/Page/ISampleResponse';
import { AboutFetcher } from '@server/About/services/AboutFetcher';
import { ISampleTestResponse } from '@common/api/dto/Page/ISampleTestResponse';
import { SamplePageService } from '@server/Page/services/SamplePageService';
import { MainFetcher } from '@server/Main/services/MainFetcher';

@Injectable()
export class SamplePageServiceMock implements SamplePageService {
  public constructor(
    private readonly aboutFetcher: AboutFetcher,
    private readonly mainFetcher: MainFetcher,
  ) {}

  public getIndex(): ISampleResponse {
    return {
      features: {
        about: this.aboutFetcher.getAbout(),
        main: this.mainFetcher.getMain(),
      },
      page: {
        title: 'Sample page',
      },
    };
  }

  public getTest(): ISampleTestResponse {
    return {
      features: {
        about: this.aboutFetcher.getAbout(),
      },
      page: {
        title: 'Sample test page',
      },
    };
  }
}
