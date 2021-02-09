import { ApiServiceBase } from '@common/api/ApiServiceBase';
import { IBasePageService } from '@common/api/types/IBasePageService';
import { ApiResponse } from '@common/api/ApiResponse';
import { IBasePageResponse } from '../types/IBasePageResponse';
import { Page } from '@common/enums/Page';
import { getApiPageRoute } from '@common/utils/routing/getPageRoutes';

export class ApiPage extends ApiServiceBase implements IBasePageService {
  public constructor() {
    super();
  }

  public init(page: Page): Promise<ApiResponse<IBasePageResponse>> {
    return this.get<IBasePageResponse>(getApiPageRoute(page));
  }
}

export const apiPage = new ApiPage();
