import { IAbout } from '@common/dto/features/IAbout';
import { Features } from '@common/enums/Features';
import { IBasePageResponse } from '@common/pages/types/IBasePageResponse';

export interface ISampleTestFeaturesResponse {
  [Features.ABOUT]: IAbout;
}

export interface ISampleTestPageResponse {
  title: string;
}

export type ISampleTestResponse = IBasePageResponse<
  ISampleTestFeaturesResponse,
  ISampleTestPageResponse
>;
