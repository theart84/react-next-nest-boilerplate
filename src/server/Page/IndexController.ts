import { Controller } from '@nestjs/common';

import { Page } from '@server/Page/decorators/Page';
import { Pages } from '@common/enums/Pages';

@Controller()
export class IndexController {
  @Page(Pages.INDEX)
  public get(): void {}
}
