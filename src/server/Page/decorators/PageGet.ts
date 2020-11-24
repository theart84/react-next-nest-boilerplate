import { applyDecorators, Get, UseInterceptors } from '@nestjs/common';

import { FormatResponse } from '@server/Page/interceptors/FormatResponse';
import { Page } from '@common/enums/Page';
import { getPageRoute } from '@common/api/utils/getPageRoutes';

export const PageGet = (page: Page): MethodDecorator => {
  const pageRoute = getPageRoute(page);

  return applyDecorators(
    Get(`:api(api/page)?${pageRoute}`),
    UseInterceptors(new FormatResponse(page)),
  );
};
