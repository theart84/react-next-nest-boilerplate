import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { AboutCreator } from '@server/About/services/AboutCreator';
import { IAbout } from '@common/api/dto/About/IAbout';
import { AboutCreateDto } from '@common/api/dto/About/AboutCreateDto';
import { AboutRoute } from '@server/About/enums/AboutRoute';
import { FormatApiResponse } from '@common/interceptors/FormatApiResponse';

@Controller(AboutRoute.BASE)
@UseInterceptors(FormatApiResponse)
export class AboutController {
  public constructor(private readonly aboutCreator: AboutCreator) {}

  @Post()
  public create(@Body() dto: AboutCreateDto): IAbout {
    return this.aboutCreator.create(dto);
  }
}
