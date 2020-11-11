import { Controller } from '@nestjs/common';

import { Page } from '@server/Page/decorators/Page';
import { Pages } from '@common/enums/Pages';
import { IInfoResponse } from '@common/dto/pages/IInfoResponse';

@Controller()
export class InfoController {
  @Page(Pages.INFO)
  public index(): IInfoResponse {
    return {
      features: {
        info: { phone: 89_531_964_913 },
      },
    };
  }
}
