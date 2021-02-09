const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { createFeatureFile, createSliceFile, createDtoFile, addFeatureToStore, addFeatureToEnum } = require('./utils/createFeature');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Введите название фичи: ', function(name) {
  fs.mkdirSync(path.resolve(process.cwd(), `src/features/${name}`));
  fs.mkdirSync(path.resolve(process.cwd(), `src/features/${name}/duck`));
  fs.mkdirSync(path.resolve(process.cwd(), `src/common/api/dto/${name}`));
  fs.writeFileSync(path.resolve(process.cwd(), `src/features/${name}/${name}.tsx`), createFeatureFile(name));
  fs.writeFileSync(path.resolve(process.cwd(), `src/features/${name}/duck/slice.ts`), createSliceFile(name));
  fs.writeFileSync(path.resolve(process.cwd(), `src/common/api/dto/${name}/I${name}.ts`), createDtoFile(name));
  fs.writeFileSync(path.resolve(process.cwd(), 'src/common/enums/Feature.ts'), addFeatureToEnum(name, fs.readFileSync(path.resolve(path.resolve(process.cwd(), 'src/common/enums/Feature.ts')).toString())));
  fs.writeFileSync(path.resolve(process.cwd(), 'src/common/redux/store.ts'), addFeatureToStore(name, fs.readFileSync(path.resolve(path.resolve(process.cwd(), 'src/common/redux/store.ts')).toString())));

  console.log('Фича успешно создана');

  process.exit();
});
