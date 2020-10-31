import { ApiResponse } from '@common/api/ApiResponse';
import { ISampleResponse } from '@common/dto/pages/ISampleResponse';
import { ISampleTestResponse } from '@common/dto/pages/ISampleTestResponse';
import { ApiPageBase } from '@common/api/ApiPageBase';
import { Pages } from '@common/enums/Pages';

export class ApiSamplePage extends ApiPageBase {
  public constructor() {
    super();
  }

  public index(): Promise<ApiResponse<ISampleResponse>> {
    return this.get<ISampleResponse>(this.getRoute(Pages.SAMPLE));
  }

  public test(): Promise<ApiResponse<ISampleTestResponse>> {
    return this.get<ISampleTestResponse>(this.getRoute(Pages.SAMPLE_TEST));
  }
}
