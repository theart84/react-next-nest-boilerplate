import { AnyObject } from 'immer/dist/types/types-internal';

import { Page } from '@common/enums/Page';
import { ISampleResponse } from '@common/api/dto/Page/ISampleResponse';
import { ISampleTestResponse } from '@common/api/dto/Page/ISampleTestResponse';
import { IInfoResponse } from '@common/api/dto/Page/IInfoResponse';

type IPageResponseBase = {
  [key in Page]: AnyObject;
};

export interface IPageResponse extends IPageResponseBase {
  [Page.SAMPLE]: ISampleResponse;
  [Page.SAMPLE_TEST]: ISampleTestResponse;
  [Page.INFO]: IInfoResponse;
}
