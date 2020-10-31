import { Controller } from '@nestjs/common';

import { ISampleResponse } from '@common/dto/pages/ISampleResponse';
import { Page } from '@server/page/decorators/Page';
import { ISampleTestResponse } from '@common/dto/pages/ISampleTestResponse';
import { Pages } from '@common/enums/Pages';

@Controller()
export class SampleController {
  @Page(Pages.SAMPLE)
  public index(): ISampleResponse {
    return {
      features: {
        about: { name: 'Name from backend', surname: 'Surname from backend' },
        main: { title: 'Title from backend' },
      },
    };
  }

  @Page(Pages.SAMPLE_TEST)
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
