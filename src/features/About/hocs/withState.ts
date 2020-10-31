import { Dispatch } from 'redux';

import {
  IWithFeatureState,
  withFeatureState,
} from '@common/redux/hocs/withFeatureState';
import { Features } from '@common/enums/Features';
import { aboutSlice } from '@features/About/duck/slice';
import { tickSelector } from '@features/About/duck/selectors';
import { IRootState } from '@common/redux/store';

const mapStateToProps = (state: IRootState) =>
  ({
    tick: tickSelector(state),
  } as const);

const mapDispatchToProps = (dispatch: Dispatch) =>
  ({
    increment: () => dispatch(aboutSlice.actions.increment()),
    decrement: () => dispatch(aboutSlice.actions.decrement()),
  } as const);

export const withState = withFeatureState({
  feature: Features.ABOUT,
  actions: aboutSlice.actions,
  mapStateToProps,
  mapDispatchToProps,
});

export type IWithState = IWithFeatureState<
  Features.ABOUT,
  typeof mapStateToProps,
  typeof mapDispatchToProps
>;
