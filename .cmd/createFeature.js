const readline = require('readline');
const fs = require('fs');
const path = require('path');
const { createFeatureFile, createSliceFile, createDtoFile, addFeatureToStore, addFeatureToEnum } = require('./utils/createFeature');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Введите название фичи: ', function(name) {
  fs.mkdirSync(path.resolve(__dirname, `../src/features/${name}`));
  fs.mkdirSync(path.resolve(__dirname, `../src/features/${name}/duck`));
  fs.writeFileSync(path.resolve(__dirname, `../src/features/${name}/${name}.tsx`), createFeatureFile(name));
  fs.writeFileSync(path.resolve(__dirname, `../src/features/${name}/duck/slice.ts`), createSliceFile(name));
  fs.writeFileSync(path.resolve(__dirname, `../src/common/dto/features/I${name}.ts`), createDtoFile(name));
  fs.writeFileSync(path.resolve(__dirname, '../src/common/enums/Features.ts'), addFeatureToEnum(name, fs.readFileSync(path.resolve(__dirname, '../src/common/enums/Features.ts')).toString()));
  fs.writeFileSync(path.resolve(__dirname, '../src/common/redux/store.ts'), addFeatureToStore(name, fs.readFileSync(path.resolve(__dirname, '../src/common/redux/store.ts')).toString()));

  console.log('Фича успешно создана');

  process.exit();
});
