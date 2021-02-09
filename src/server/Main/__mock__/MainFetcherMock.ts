import { Injectable } from '@nestjs/common';

import { MainFetcher } from '@server/Main/services/MainFetcher';
import { IMain } from '@common/api/dto/Main/IMain';

@Injectable()
export class MainFetcherMock implements MainFetcher {
  public getMain(): IMain {
    return { title: 'Title from backend' };
  }
}
