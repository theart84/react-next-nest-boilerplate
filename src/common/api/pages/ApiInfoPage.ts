import { ApiResponse } from '@common/api/ApiResponse';
import { ApiPageBase } from '@common/api/ApiPageBase';
import { Pages } from '@common/enums/Pages';
import { IInfoResponse } from '@common/dto/pages/IInfoResponse';

export class ApiInfoPage extends ApiPageBase {
  public constructor() {
    super();
  }

  public index(): Promise<ApiResponse<IInfoResponse>> {
    return this.get<IInfoResponse>(this.getRoute(Pages.INFO));
  }
}
