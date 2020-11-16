import { IAbout } from '@common/dto/features/IAbout';
import { IMain } from '@common/dto/features/IMain';
import { Features } from '@common/enums/Features';
import { IBasePageResponse } from '@common/pages/types/IBasePageResponse';

export type ISampleResponse = IBasePageResponse<
  {
    [Features.ABOUT]: IAbout;
    [Features.MAIN]: IMain;
  },
  undefined
>;
