import { IAbout } from '@common/api/dto/About/IAbout';
import { IMain } from '@common/api/dto/Main/IMain';
import { Feature } from '@common/enums/Feature';
import { IBasePageResponse } from '@common/types/IBasePageResponse';

export type ISampleResponse = IBasePageResponse<{
  [Feature.ABOUT]: IAbout;
  [Feature.MAIN]: IMain;
}>;
