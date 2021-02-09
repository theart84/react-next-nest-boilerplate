import { Controller } from '@nestjs/common';

import { ISampleResponse } from '@common/api/dto/Page/ISampleResponse';
import { ISampleTestResponse } from '@common/api/dto/Page/ISampleTestResponse';
import { SamplePageService } from '@server/Page/services/SamplePageService';
import { PageGet } from '@server/Page/decorators/PageGet';
import { Page } from '@common/enums/Page';

@Controller()
export class SampleController {
  public constructor(private readonly samplePageService: SamplePageService) {}

  @PageGet(Page.SAMPLE)
  public index(): ISampleResponse {
    return this.samplePageService.getIndex();
  }

  @PageGet(Page.SAMPLE_TEST)
  public test(): ISampleTestResponse {
    return this.samplePageService.getTest();
  }
}
