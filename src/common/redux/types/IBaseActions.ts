import { AnyAction } from 'redux';

import { IFeatureState } from '@common/redux/types/IFeatureState';
import { Features } from '@common/enums/Features';

export interface IBaseActions<Feature extends Features> {
  setState(state: IFeatureState<Feature>): AnyAction;
}
