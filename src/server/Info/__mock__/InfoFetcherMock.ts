import { Injectable } from '@nestjs/common';

import { InfoFetcher } from '@server/Info/services/InfoFetcher';
import { IInfo } from '@common/api/dto/Info/IInfo';

@Injectable()
export class InfoFetcherMock implements InfoFetcher {
  public getInfo(): IInfo {
    return { phone: 89_531_964_913 };
  }
}
