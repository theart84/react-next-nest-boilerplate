import { Get, UseInterceptors } from '@nestjs/common';

import { FormatResponse } from '@server/Page/interceptors/FormatResponse';
import { Page } from '@common/enums/Page';
import { getPageRoute } from '@common/api/utils/getPageRoutes';

export const PageGet = (page: Page): MethodDecorator => (
  target,
  propertyKey: string | symbol,
  descriptor,
) => {
  const pageRoute = getPageRoute(page);

  Get(`:api(api/page)?${pageRoute}`)(target, propertyKey, descriptor);
  UseInterceptors(new FormatResponse(page))(
    target,
    String(propertyKey),
    descriptor,
  );
};
