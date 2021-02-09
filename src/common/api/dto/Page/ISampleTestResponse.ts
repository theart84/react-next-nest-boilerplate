import { IAbout } from '@common/api/dto/About/IAbout';
import { Feature } from '@common/enums/Feature';
import { IBasePageResponse } from '@common/api/types/IBasePageResponse';

export type ISampleTestResponse = IBasePageResponse<{
  [Feature.ABOUT]: IAbout;
}>;
