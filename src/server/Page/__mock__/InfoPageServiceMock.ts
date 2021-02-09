import { Injectable } from '@nestjs/common';

import { InfoPageService } from '@server/Page/services/InfoPageService';
import { IInfoResponse } from '@common/api/dto/Page/IInfoResponse';
import { InfoFetcher } from '@server/Info/services/InfoFetcher';

@Injectable()
export class InfoPageServiceMock implements InfoPageService {
  public constructor(private readonly infoFetcher: InfoFetcher) {}

  public index(): IInfoResponse {
    return {
      features: {
        info: this.infoFetcher.getInfo(),
      },
      page: {
        title: 'Info page',
      },
    };
  }
}
