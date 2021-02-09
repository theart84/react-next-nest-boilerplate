import { applyDecorators, Get, UseInterceptors } from '@nestjs/common';

import { FormatPageResponse } from '@server/Page/interceptors/FormatPageResponse';
import { Page } from '@common/enums/Page';
import { getPageRoute } from '@common/utils/routing/getPageRoutes';
import { API_PAGE_PREFIX } from '@common/utils/constants';

export const PageGet = (page: Page): MethodDecorator => {
  const pageRoute = getPageRoute(page);

  return applyDecorators(
    Get(`:api(${API_PAGE_PREFIX.slice(1)})?${pageRoute}`),
    UseInterceptors(new FormatPageResponse(page)),
  );
};
