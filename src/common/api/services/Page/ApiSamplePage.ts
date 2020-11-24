import { ApiResponse } from '@common/api/ApiResponse';
import { ISampleResponse } from '@common/api/dto/Page/ISampleResponse';
import { ISampleTestResponse } from '@common/api/dto/Page/ISampleTestResponse';
import { ApiPageBase } from '@common/api/ApiPageBase';
import { Page } from '@common/enums/Page';

export class ApiSamplePage extends ApiPageBase {
  public constructor() {
    super();
  }

  public index(): Promise<ApiResponse<ISampleResponse>> {
    return this.get<ISampleResponse>(this.getRoute(Page.SAMPLE));
  }

  public test(): Promise<ApiResponse<ISampleTestResponse>> {
    return this.get<ISampleTestResponse>(this.getRoute(Page.SAMPLE_TEST));
  }
}
