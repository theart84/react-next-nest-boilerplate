const createPageFile = (name) => `import { IBaseNextPage } from '@common/types/IBaseNextPage';
import { Page } from '@common/enums/Page';

const ${name}Page: IBaseNextPage<Page.${name.toUpperCase()}> = () => (
  <>${name} page</>
);

${name}Page.page = Page.${name.toUpperCase()};

export { ${name}Page as default };
`;

const createDtoFile = (name) => `import { IBasePageResponse } from '@common/api/types/IBasePageResponse';

export type I${name}Response = IBasePageResponse;
`;

const addToPageResponse = (name, file) => file.toString().replace(/(export interface IPageResponse (.*\n)*)(})/,
  `$1  [Page.${name.toUpperCase()}]: I${name}Response;
}`).replace(/(import .*\n)\n/,
  `$1import { I${name}Response } from '@common/api/dto/Page/I${name}Response';\n\n`);

const createApiServiceFile = (name) => `import { ApiResponse } from '@common/api/ApiResponse';
import { ApiPageBase } from '@common/api/ApiPageBase';
import { Page } from '@common/enums/Page';
import { I${name}Response } from '@common/api/dto/Page/I${name}Response';

export class Api${name}Page extends ApiPageBase {
  public constructor() {
    super();
  }

  public index(): Promise<ApiResponse<I${name}Response>> {
    return this.get<I${name}Response>(this.getRoute(Page.${name.toUpperCase()}));
  }
}
`;

const addToApiServiceList = (name, file) => file.toString().replace(/(import .*\n)\n/,
  `$1import { Api${name}Page } from '@common/api/services/Page/Api${name}Page';\n\n`)
  .replace(/(const pagesApiServices(.*\n)*)(};)/,
    `$1  [Page.${name.toUpperCase()}]: new Api${name}Page(),
};`).replace(/(export interface IPageApiServicesInstance(.*\n)*)(})\n/,
    `$1  [Page.${name.toUpperCase()}]: Api${name}Page;
}\n`);

const addToRoutesList = (name, file) => file.toString().replace(/(const pagesRoutes(.*\n)*)(};)/,
    `$1  [Page.${name.toUpperCase()}]: {
    route: '/${name.toLowerCase()}',
  },
};`);

const addPageToEnum = (name, file) => file.toString().replace(/,\n}/, `,
  ${name.toUpperCase()} = '${name}',
}`);


const createNestControllerFile = (name) => `import { Controller } from '@nestjs/common';

import { PageGet } from '@server/Page/decorators/PageGet';
import { Page } from '@common/enums/Page';
import { I${name}Response } from '@common/api/dto/Page/I${name}Response';

@Controller()
export class ${name}Controller {
  @PageGet(Page.${name.toUpperCase()})
  public index(): I${name}Response {
    return {
      page: {
        title: 'Hello world from ${name} page',
      },
      features: {},
    };
  }
}
`;

const addToNestModuleList = (name, file) => file.toString().replace(/(import .*\n)\n/,
  `$1import { ${name}Controller } from '@server/Page/controllers/${name}Controller';\n\n`)
  .replace(/(controllers: \[(.*\n)*.*)(],)/,
    `$1, ${name}Controller],`);

module.exports = {
  createPageFile,
  createDtoFile,
  addToPageResponse,
  createApiServiceFile,
  addToApiServiceList,
  addToRoutesList,
  addPageToEnum,
  createNestControllerFile,
  addToNestModuleList,
};
