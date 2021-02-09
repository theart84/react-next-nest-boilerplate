import { Injectable } from '@nestjs/common';

import { IndexPageService } from '@server/Page/services/IndexPageService';
import { IBasePageResponse } from '@common/api/types/IBasePageResponse';

@Injectable()
export class IndexPageServiceMock implements IndexPageService {
  public getIndex(): IBasePageResponse {
    return {
      page: {
        title: 'Index page',
      },
      features: {},
    };
  }
}
