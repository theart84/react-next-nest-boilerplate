import { Controller } from '@nestjs/common';

import { PageGet } from '@server/Page/decorators/PageGet';
import { Page } from '@common/enums/Page';
import { IInfoResponse } from '@common/api/dto/Page/IInfoResponse';

@Controller()
export class InfoController {
  @PageGet(Page.INFO)
  public index(): IInfoResponse {
    return {
      features: {
        info: { phone: 89_531_964_913 },
      },
    };
  }
}
