import { Controller } from '@nestjs/common';

import { PageGet } from '@server/Page/decorators/PageGet';
import { Page } from '@common/enums/Page';

@Controller()
export class IndexController {
  @PageGet(Page.INDEX)
  public get(): void {}
}
