import { Injectable } from '@nestjs/common';

import { IAbout } from '@common/api/dto/About/IAbout';
import { AboutCreateDto } from '@common/api/dto/About/AboutCreateDto';

@Injectable()
export abstract class AboutCreator {
  public abstract create(dto: AboutCreateDto): IAbout;
}
