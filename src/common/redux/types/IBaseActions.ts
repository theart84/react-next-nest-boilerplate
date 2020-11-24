import { AnyAction } from 'redux';

import { IFeatureState } from '@common/redux/types/IFeatureState';
import { Feature } from '@common/enums/Feature';

export interface IBaseActions<FeatureName extends Feature> {
  setState(state: IFeatureState<FeatureName>): AnyAction;
}
