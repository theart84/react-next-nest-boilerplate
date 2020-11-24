import { Feature } from '@common/enums/Feature';
import { IBasePageResponse } from '@common/types/IBasePageResponse';
import { IInfo } from '@common/api/dto/Info/IInfo';

export type IInfoResponse = IBasePageResponse<{
  [Feature.INFO]: IInfo;
}>;
