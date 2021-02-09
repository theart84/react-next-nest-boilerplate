import { ApiServiceBase } from '@common/api/ApiServiceBase';
import { AboutCreateDto } from '@common/api/dto/About/AboutCreateDto';
import { IAbout } from '@common/api/dto/About/IAbout';
import { AboutRoute } from '@server/About/enums/AboutRoute';
import { ApiResponse } from '@common/api/ApiResponse';

export class ApiAbout extends ApiServiceBase {
  public constructor() {
    super();
  }

  public create(dto: AboutCreateDto): Promise<ApiResponse<IAbout>> {
    return this.post(AboutRoute.BASE, dto);
  }
}

export const apiAbout = new ApiAbout();
