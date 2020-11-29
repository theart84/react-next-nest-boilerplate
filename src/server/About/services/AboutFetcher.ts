import { Injectable } from '@nestjs/common';

import { IAbout } from '@common/api/dto/About/IAbout';

@Injectable()
export abstract class AboutFetcher {
  public abstract getAbout(): IAbout;
}
