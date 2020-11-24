import { ApiServiceBase } from '@common/api/ApiServiceBase';
import { Page } from '@common/enums/Page';
import { getPageRoute } from '@common/api/utils/getPageRoutes';

export class ApiPageBase extends ApiServiceBase {
  public constructor() {
    super();
  }

  protected getRoute(page: Page): string {
    return this.getUrl(getPageRoute(page));
  }

  private getUrl(url: string): string {
    return `/api/page${url}`;
  }
}
