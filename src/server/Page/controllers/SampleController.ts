import { Controller } from '@nestjs/common';

import { ISampleResponse } from '@common/api/dto/Page/ISampleResponse';
import { PageGet } from '@server/Page/decorators/PageGet';
import { ISampleTestResponse } from '@common/api/dto/Page/ISampleTestResponse';
import { Page } from '@common/enums/Page';
import { AboutFetcher } from '@server/About/services/AboutFetcher';

@Controller()
export class SampleController {
  public constructor(private readonly aboutFetcher: AboutFetcher) {}

  @PageGet(Page.SAMPLE)
  public index(): ISampleResponse {
    return {
      features: {
        about: this.aboutFetcher.getAbout(),
        main: { title: 'Title from backend' },
      },
    };
  }

  @PageGet(Page.SAMPLE_TEST)
  public test(): ISampleTestResponse {
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
