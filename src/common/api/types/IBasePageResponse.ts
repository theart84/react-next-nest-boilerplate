import { AnyObject } from 'immer/dist/types/types-internal';

import { Feature } from '@common/enums/Feature';

export interface IBasePageResponse<
  // eslint-disable-next-line @typescript-eslint/ban-types
  FeatureState extends { [key in Feature]?: AnyObject } = {},
  PageState extends AnyObject = AnyObject
> {
  features: FeatureState;
  page: {
    title: string;
  } & PageState;
}
