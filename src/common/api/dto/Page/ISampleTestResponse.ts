import { IAbout } from '@common/api/dto/About/IAbout';
import { Feature } from '@common/enums/Feature';
import { IBasePageResponse } from '@common/types/IBasePageResponse';

export interface ISampleTestFeaturesResponse {
  [Feature.ABOUT]: IAbout;
}

export interface ISampleTestPageResponse {
  title: string;
}

export type ISampleTestResponse = IBasePageResponse<
  ISampleTestFeaturesResponse,
  ISampleTestPageResponse
>;
