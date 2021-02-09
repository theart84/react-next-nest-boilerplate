import { Injectable } from '@nestjs/common';

import { IAbout } from '@common/api/dto/About/IAbout';
import { AboutCreator } from '@server/About/services/AboutCreator';
import { AboutCreateDto } from '@common/api/dto/About/AboutCreateDto';

@Injectable()
export class AboutCreatorMock implements AboutCreator {
  public create(dto: AboutCreateDto): IAbout {
    return dto;
  }
}
