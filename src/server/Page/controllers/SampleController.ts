import { Controller } from '@nestjs/common';

import { ISampleResponse } from '@common/api/dto/Page/ISampleResponse';
import { PageGet } from '@server/Page/decorators/PageGet';
import { ISampleTestResponse } from '@common/api/dto/Page/ISampleTestResponse';
import { Page } from '@common/enums/Page';

@Controller()
export class SampleController {
  @PageGet(Page.SAMPLE)
  public index(): ISampleResponse {
    return {
      features: {
        about: { name: 'Name from backend', surname: 'Surname from backend' },
        main: { title: 'Title from backend' },
      },
    };
  }

  @PageGet(Page.SAMPLE_TEST)
  public test(): ISampleTestResponse {
    return {
      features: {
        about: { name: 'Hello from backend', surname: 'Hello!' },
      },
      page: {
        title: 'Sample test page',
      },
    };
  }
}
