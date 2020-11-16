import { Features } from '@common/enums/Features';
import { IBasePageResponse } from '@common/pages/types/IBasePageResponse';
import { IInfo } from '@common/dto/features/IInfo';

export type IInfoResponse = IBasePageResponse<
  {
    [Features.INFO]: IInfo;
  },
  undefined
>;
