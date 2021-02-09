import { connect, InferableComponentEnhancer } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';

import { IRootState } from '@common/redux/store';
import { getFeatureStateSelector } from '@common/redux/selectors/getFeatureStateSelector';
import { Feature } from '@common/enums/Feature';
import { IFeatureState } from '@common/redux/types/IFeatureState';

type IMapStateToProps = (state: IRootState) => Record<string, unknown>;
type IMapDispatchToProps = (dispatch: Dispatch) => Record<string, unknown>;

interface IBaseActions<FeatureName extends Feature> {
  setState(state: IFeatureState<FeatureName>): AnyAction;
}

export type IWithFeatureState<
  FeatureName extends Feature,
  MapStateToProps extends IMapStateToProps | undefined = undefined,
  MapDispatchToProps extends IMapDispatchToProps | undefined = undefined
> = (MapStateToProps extends IMapStateToProps
  ? ReturnType<MapStateToProps>
  : unknown) &
  (MapDispatchToProps extends IMapDispatchToProps
    ? ReturnType<MapDispatchToProps>
    : unknown) & {
    state: IFeatureState<FeatureName>;
    setState(response: IFeatureState<FeatureName>): void;
  };

interface IParams<
  FeatureName extends Feature,
  MapStateToProps extends IMapStateToProps | undefined = undefined,
  MapDispatchToProps extends IMapDispatchToProps | undefined = undefined
> {
  feature: FeatureName;
  actions: IBaseActions<FeatureName>;
  mapStateToProps?: MapStateToProps;
  mapDispatchToProps?: MapDispatchToProps;
}

type IReturnType<
  FeatureName extends Feature,
  MapStateToProps extends IMapStateToProps | undefined = undefined,
  MapDispatchToProps extends IMapDispatchToProps | undefined = undefined
> = InferableComponentEnhancer<
  IWithFeatureState<FeatureName, MapStateToProps, MapDispatchToProps>
>;

export const withFeatureState = <
  FeatureName extends Feature,
  MapStateToProps extends IMapStateToProps | undefined = undefined,
  MapDispatchToProps extends IMapDispatchToProps | undefined = undefined
>({
  feature,
  actions,
  mapStateToProps,
  mapDispatchToProps,
}: IParams<FeatureName, MapStateToProps, MapDispatchToProps>): IReturnType<
  FeatureName,
  MapStateToProps,
  MapDispatchToProps
> => {
  const responseSelector = getFeatureStateSelector(feature);

  const mapStateToProperties = (
    state: IRootState,
  ): { state: IFeatureState<FeatureName> } & ReturnType<IMapStateToProps> => ({
    state: responseSelector(state),
    ...(mapStateToProps ? mapStateToProps(state) : undefined),
  });

  const mapDispatchToProperties = (
    dispatch: Dispatch,
  ): IBaseActions<FeatureName> => ({
    setState: (response: IFeatureState<FeatureName>) =>
      dispatch(actions.setState(response)),
    ...(mapDispatchToProps ? mapDispatchToProps(dispatch) : undefined),
  });

  type ComponentType = InferableComponentEnhancer<
    ReturnType<typeof mapStateToProperties> &
      ReturnType<typeof mapDispatchToProperties>
  >;

  return ((component) =>
    connect(
      mapStateToProperties,
      mapDispatchToProperties,
    )(component)) as ComponentType;
};
