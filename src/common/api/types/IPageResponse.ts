import { Page } from '@common/enums/Page';
import { ISampleResponse } from '@common/api/dto/Page/ISampleResponse';
import { ISampleTestResponse } from '@common/api/dto/Page/ISampleTestResponse';
import { IInfoResponse } from '@common/api/dto/Page/IInfoResponse';
import { IBasePageResponse } from '@common/api/types/IBasePageResponse';

type IPageResponseBase = {
  [key in Page]: IBasePageResponse;
};

export interface IPageResponse extends IPageResponseBase {
  [Page.SAMPLE]: ISampleResponse;
  [Page.SAMPLE_TEST]: ISampleTestResponse;
  [Page.INFO]: IInfoResponse;
  [Page.INDEX]: IBasePageResponse;
}
