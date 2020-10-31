import { ApiServiceBase } from '@common/api/ApiServiceBase';
import { Pages } from '@common/enums/Pages';
import { getPageRoute } from '@common/pages/utils/getPageRoutes';

export class ApiPageBase extends ApiServiceBase {
  public constructor() {
    super();
  }

  protected getRoute(page: Pages): string {
    return this.getUrl(getPageRoute(page));
  }

  private getUrl(url: string): string {
    return `/api/page${url}`;
  }
}
