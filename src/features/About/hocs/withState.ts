import { ConnectedProps } from 'react-redux';

import { withFeatureState } from '@common/redux/hocs/withFeatureState';
import { Feature } from '@common/enums/Feature';
import { aboutSlice, asyncActions } from '@features/About/duck/slice';
import { tickSelector } from '@features/About/duck/selectors';
import { IRootState } from '@common/redux/store';
import { AboutCreateDto } from '@common/api/dto/About/AboutCreateDto';
import { IDispatch } from '@common/redux/types/IDispatch';

const mapStateToProps = (state: IRootState) =>
  ({
    tick: tickSelector(state),
  } as const);

const mapDispatchToProps = (dispatch: IDispatch) =>
  ({
    increment: () => dispatch(aboutSlice.actions.increment()),
    decrement: () => dispatch(aboutSlice.actions.decrement()),
    create: (dto: AboutCreateDto) => dispatch(asyncActions.createAbout(dto)),
  } as const);

export const withState = withFeatureState({
  feature: Feature.ABOUT,
  actions: aboutSlice.actions,
  mapStateToProps,
  mapDispatchToProps,
});

export type IWithState = ConnectedProps<typeof withState>;
