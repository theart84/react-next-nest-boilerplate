export interface IBasePageFeaturesResponse<FeatureState> {
  features: FeatureState;
}

export interface IBasePagePagesResponse<PageState> {
  page: PageState;
}

export type IBasePageResponse<
  FeatureState extends unknown | undefined = unknown,
  PageState extends unknown | undefined = unknown
> = (FeatureState extends undefined
  ? { features?: undefined }
  : IBasePageFeaturesResponse<FeatureState>) &
  (PageState extends undefined
    ? { page?: undefined }
    : IBasePagePagesResponse<PageState>);
