import { Features } from '@common/enums/Features';
import { IRootState } from '@common/redux/store';

export type IFeatureState<
  Feature extends Features
> = IRootState[Feature]['state'];
