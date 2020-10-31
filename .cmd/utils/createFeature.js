const createFeatureFile = (name) => `import { FC } from 'react';

import { ${name.toLowerCase()}Slice } from '@features/${name}/duck/slice';
import {
  IWithFeatureState,
  withFeatureState,
} from '@common/redux/hocs/withFeatureState';
import { Features } from '@common/enums/Features';

export const ${name}Component: FC<IWithFeatureState<Features.${name.toUpperCase()}>> = () => <></>;

export const ${name} = withFeatureState({
  feature: Features.${name.toUpperCase()},
  actions: ${name.toLowerCase()}Slice.actions,
})(${name}Component);
`;

const createSliceFile = (name) => `import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IBaseFeatureState } from '@common/redux/types/IBaseFeatureState';
import { Features } from '@common/enums/Features';
import { I${name} } from '@common/dto/features/I${name}';

export type IState = IBaseFeatureState<I${name}>;

export const ${name.toLowerCase()}Slice = createSlice({
  name: Features.${name.toUpperCase()},
  initialState: {} as IState,
  reducers: {
    setState: (draft, action: PayloadAction<I${name}>) => {
      draft.state = action.payload;
    },
  },
});
`;

const createDtoFile = (name) => `export interface I${name} {}
`;

const addFeatureToStore = (name, file) => file.toString().replace(/(const reducer = {\n(.*\n)*)(};)/,
  `$1  [Features.${name.toUpperCase()}]: ${name.toLowerCase()}Slice.reducer,
};`).replace(/(import .*\n)\n/,
  `$1import { ${name.toLowerCase()}Slice } from '@features/${name}/duck/slice';\n\n`);

const addFeatureToEnum = (name, file) => file.toString().replace(/,\n}/, `,
  ${name.toUpperCase()} = '${name.toLowerCase()}',
}`);

module.exports = { createFeatureFile, addFeatureToEnum, createSliceFile, createDtoFile, addFeatureToStore };

