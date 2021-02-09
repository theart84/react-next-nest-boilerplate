import { Controller } from '@nestjs/common';

import { PageGet } from '@server/Page/decorators/PageGet';
import { Page } from '@common/enums/Page';
import { IndexPageService } from '@server/Page/services/IndexPageService';
import { IBasePageResponse } from '@common/api/types/IBasePageResponse';

@Controller()
export class IndexController {
  public constructor(private readonly indexPageService: IndexPageService) {}

  @PageGet(Page.INDEX)
  public get(): IBasePageResponse {
    return this.indexPageService.getIndex();
  }
}
