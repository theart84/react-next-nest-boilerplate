const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { createPageFile, createDtoFile, addToPageResponse, createApiServiceFile, addToApiServiceList, addToRoutesList, addPageToEnum, createNestControllerFile, addToNestModuleList } = require('./utils/createPage');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Введите название страницы: ', function(name) {
  fs.writeFileSync(path.resolve(__dirname, `../src/pages/views/${name}.tsx`), createPageFile(name));
  fs.writeFileSync(path.resolve(__dirname, '../src/common/enums/Pages.ts'), addPageToEnum(name, fs.readFileSync(path.resolve(__dirname, '../src/common/enums/Pages.ts')).toString()));
  fs.writeFileSync(path.resolve(__dirname, `../src/common/dto/pages/I${name}Response.ts`), createDtoFile(name));
  fs.writeFileSync(path.resolve(__dirname, '../src/common/pages/types/IPageResponse.ts'), addToPageResponse(name, fs.readFileSync(path.resolve(__dirname, '../src/common/pages/types/IPageResponse.ts')).toString()));
  fs.writeFileSync(path.resolve(__dirname, `../src/common/api/pages/Api${name}Page.ts`), createApiServiceFile(name));
  fs.writeFileSync(path.resolve(__dirname, '../src/common/pages/utils/getPageApiService.ts'), addToApiServiceList(name, fs.readFileSync(path.resolve(__dirname, '../src/common/pages/utils/getPageApiService.ts')).toString()));
  fs.writeFileSync(path.resolve(__dirname, '../src/common/pages/utils/getPageRoutes.ts'), addToRoutesList(name, fs.readFileSync(path.resolve(__dirname, '../src/common/pages/utils/getPageRoutes.ts')).toString()));
  fs.writeFileSync(path.resolve(__dirname, `../src/server/page/${name}Controller.ts`), createNestControllerFile(name));
  fs.writeFileSync(path.resolve(__dirname, '../src/server/page/PageModule.ts'), addToNestModuleList(name, fs.readFileSync(path.resolve(__dirname, '../src/server/page/PageModule.ts')).toString()));

  console.log('Страница успешно создана');

  process.exit();
});
