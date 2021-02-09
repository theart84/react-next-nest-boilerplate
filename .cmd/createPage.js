const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { createPageFile, createDtoFile, addToPageResponse, createApiServiceFile, addToApiServiceList, addToRoutesList, addPageToEnum, createNestControllerFile, addToNestModuleList } = require('./utils/createPage');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Введите название страницы: ', function(name) {
  fs.writeFileSync(path.resolve(process.cwd(), `src/pages/views/${name}.tsx`), createPageFile(name));
  fs.writeFileSync(path.resolve(process.cwd(), 'src/common/enums/Page.ts'), addPageToEnum(name, fs.readFileSync(path.resolve(process.cwd(), 'src/common/enums/Page.ts')).toString()));
  fs.writeFileSync(path.resolve(process.cwd(), `src/common/api/dto/Page/I${name}Response.ts`), createDtoFile(name));
  fs.writeFileSync(path.resolve(process.cwd(), 'src/common/api/types/IPageResponse.ts'), addToPageResponse(name, fs.readFileSync(path.resolve(process.cwd(), 'src/common/api/types/IPageResponse.ts')).toString()));
  fs.writeFileSync(path.resolve(process.cwd(), 'src/common/utils/routing/getPageRoutes.ts'), addToRoutesList(name, fs.readFileSync(path.resolve(process.cwd(), 'src/common/utils/routing/getPageRoutes.ts')).toString()));
  fs.writeFileSync(path.resolve(process.cwd(), `src/server/Page/controllers/${name}Controller.ts`), createNestControllerFile(name));
  fs.writeFileSync(path.resolve(process.cwd(), 'src/server/Page/PageModule.ts'), addToNestModuleList(name, fs.readFileSync(path.resolve(process.cwd(), 'src/server/Page/PageModule.ts')).toString()));

  console.log('Страница успешно создана');

  process.exit();
});
