export interface IBasePageResponse<
  FeatureState = unknown,
  PageState = unknown
> {
  features?: FeatureState;
  page?: PageState;
}
