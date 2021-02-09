import { Controller } from '@nestjs/common';

import { PageGet } from '@server/Page/decorators/PageGet';
import { Page } from '@common/enums/Page';
import { IInfoResponse } from '@common/api/dto/Page/IInfoResponse';
import { InfoPageService } from '@server/Page/services/InfoPageService';

@Controller()
export class InfoController {
  public constructor(private readonly infoPageService: InfoPageService) {}

  @PageGet(Page.INFO)
  public index(): IInfoResponse {
    return this.infoPageService.index();
  }
}
