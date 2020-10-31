import { connect, InferableComponentEnhancer } from 'react-redux';
import { Dispatch } from 'redux';

import { IRootState } from '@common/redux/store';
import { getFeatureStateSelector } from '@common/redux/selectors/getFeatureStateSelector';
import { Features } from '@common/enums/Features';
import { IFeatureState } from '@common/redux/types/IFeatureState';
import { IBaseActions } from '@common/redux/types/IBaseActions';

type IMapStateToProps = (state: IRootState) => Record<string, unknown>;
type IMapDispatchToProps = (dispatch: Dispatch) => Record<string, unknown>;

export type IWithFeatureState<
  Feature extends Features,
  MapStateToProps extends IMapStateToProps = undefined,
  MapDispatchToProps extends IMapDispatchToProps = undefined
> = {
  state: IFeatureState<Feature>;
  setState(response: IFeatureState<Feature>): void;
} & (MapStateToProps extends IMapStateToProps
  ? ReturnType<MapStateToProps>
  : undefined) &
  (MapDispatchToProps extends IMapDispatchToProps
    ? ReturnType<MapDispatchToProps>
    : undefined);

interface IParams<
  Feature extends Features,
  MapStateToProps extends IMapStateToProps = undefined,
  MapDispatchToProps extends IMapDispatchToProps = undefined
> {
  feature: Feature;
  actions: IBaseActions<Feature>;
  mapStateToProps?: MapStateToProps;
  mapDispatchToProps?: MapDispatchToProps;
}

type IReturnType<
  Feature extends Features,
  MapStateToProps extends IMapStateToProps = undefined,
  MapDispatchToProps extends IMapDispatchToProps = undefined
> = InferableComponentEnhancer<
  IWithFeatureState<Feature, MapStateToProps, MapDispatchToProps>
>;

export const withFeatureState = <
  Feature extends Features,
  MapStateToProps extends IMapStateToProps = undefined,
  MapDispatchToProps extends IMapDispatchToProps = undefined
>({
  feature,
  actions,
  mapStateToProps,
  mapDispatchToProps,
}: IParams<Feature, MapStateToProps, MapDispatchToProps>): IReturnType<
  Feature,
  MapStateToProps,
  MapDispatchToProps
> => {
  const responseSelector = getFeatureStateSelector(feature);

  const mapStateToProperties = (
    state: IRootState,
  ): { state: IFeatureState<Feature> } & ReturnType<IMapStateToProps> => ({
    state: responseSelector(state),
    ...(mapStateToProps ? mapStateToProps(state) : undefined),
  });

  const mapDispatchToProperties = (
    dispatch: Dispatch,
  ): { setState(response: IFeatureState<Feature>): void } => ({
    setState: (response: IFeatureState<Feature>) =>
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
