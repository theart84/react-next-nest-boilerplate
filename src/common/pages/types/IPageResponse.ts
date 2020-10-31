import { Pages } from '@common/enums/Pages';
import { ISampleResponse } from '@common/dto/pages/ISampleResponse';
import { ISampleTestResponse } from '@common/dto/pages/ISampleTestResponse';
import { IBasePageResponse } from '@common/pages/types/IBasePageResponse';
import { IInfoResponse } from '@common/dto/pages/IInfoResponse';

type IPageResponseBase = {
  [key in Pages]?: IBasePageResponse | Record<string, unknown>;
};

export interface IPageResponse extends IPageResponseBase {
  [Pages.SAMPLE]: ISampleResponse;
  [Pages.SAMPLE_TEST]: ISampleTestResponse;
  [Pages.INFO]: IInfoResponse;
}
