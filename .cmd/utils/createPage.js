const createPageFile = (name) => `import { IBaseNextPage } from '@common/pages/types/IBaseNextPage';
import { Pages } from '@common/enums/Pages';

const ${name}Page: IBaseNextPage<Pages.${name.toUpperCase()}> = () => (
  <>${name} page</>
);

${name}Page.init = async ({ store, query, apiService, isServer }) => {
  const payload = isServer ? query : (await apiService.index()).payload;
};

export { ${name}Page as default };
`;

const createDtoFile = (name) => `import { IBasePageResponse } from '@common/pages/types/IBasePageResponse';

export type I${name}Response = IBasePageResponse;
`;

const addToPageResponse = (name, file) => file.toString().replace(/(export interface IPageResponse (.*\n)*)(})/,
  `$1  [Pages.${name.toUpperCase()}]: I${name}Response;
}`).replace(/(import .*\n)\n/,
  `$1import { I${name}Response } from '@common/dto/pages/I${name}Response';\n\n`);

const createApiServiceFile = (name) => `import { ApiResponse } from '@common/api/ApiResponse';
import { ApiPageBase } from '@common/api/ApiPageBase';
import { Pages } from '@common/enums/Pages';
import { I${name}Response } from '@common/dto/pages/I${name}Response';

export class Api${name}Page extends ApiPageBase {
  public constructor() {
    super();
  }

  public index(): Promise<ApiResponse<I${name}Response>> {
    return this.get<I${name}Response>(this.getRoute(Pages.${name.toUpperCase()}));
  }
}
`;

const addToApiServiceList = (name, file) => file.toString().replace(/(import .*\n)\n/,
  `$1import { Api${name}Page } from '@common/api/pages/Api${name}Page';\n\n`)
  .replace(/(const pagesApiServices(.*\n)*)(};)/,
    `$1  [Pages.${name.toUpperCase()}]: Api${name}Page,
};`).replace(/(export interface IPageApiServicesInstance(.*\n)*)(})/,
    `$1  [Pages.${name.toUpperCase()}]: Api${name}Page;
}`);

const addToRoutesList = (name, file) => file.toString().replace(/(const pagesRoutes(.*\n)*)(};)/,
    `$1  [Pages.${name.toUpperCase()}]: {
    route: '/${name.toLowerCase()}',
  },
};`);

const addPageToEnum = (name, file) => file.toString().replace(/,\n}/, `,
  ${name.toUpperCase()} = '${name}',
}`);


const createNestControllerFile = (name) => `import { Controller } from '@nestjs/common';

import { Page } from '@server/page/decorators/Page';
import { Pages } from '@common/enums/Pages';
import { I${name}Response } from '@common/dto/pages/I${name}Response';

@Controller()
export class ${name}Controller {
  @Page(Pages.${name.toUpperCase()})
  public index(): I${name}Response {
    return {};
  }
}
`;

const addToNestModuleList = (name, file) => file.toString().replace(/(import .*\n)\n/,
  `$1import { ${name}Controller } from '@server/page/${name}Controller';\n\n`)
  .replace(/(controllers: \[(.*\n)*.*)(],)/,
    `$1, ${name}Controller],`);

module.exports = { createPageFile, createDtoFile, addToPageResponse, createApiServiceFile, addToApiServiceList, addToRoutesList, addPageToEnum, createNestControllerFile, addToNestModuleList };
