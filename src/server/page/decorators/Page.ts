import { UseInterceptors } from '@nestjs/common';

import { FormatResponse } from '@server/page/interceptors/FormatResponse';
import { GetPageWithApi } from '@server/page/decorators/GetPageWithApi';
import { Pages } from '@common/enums/Pages';
import { getPageRoute } from '@common/pages/utils/getPageRoutes';

export const Page = (page: Pages): MethodDecorator => (
  target,
  propertyKey: string,
  descriptor,
) => {
  const pageRoute = getPageRoute(page);

  GetPageWithApi(pageRoute)(target, propertyKey, descriptor);
  UseInterceptors(new FormatResponse(page))(target, propertyKey, descriptor);
};
