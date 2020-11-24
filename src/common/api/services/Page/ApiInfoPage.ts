import { ApiResponse } from '@common/api/ApiResponse';
import { ApiPageBase } from '@common/api/ApiPageBase';
import { Page } from '@common/enums/Page';
import { IInfoResponse } from '@common/api/dto/Page/IInfoResponse';

export class ApiInfoPage extends ApiPageBase {
  public constructor() {
    super();
  }

  public index(): Promise<ApiResponse<IInfoResponse>> {
    return this.get<IInfoResponse>(this.getRoute(Page.INFO));
  }
}
