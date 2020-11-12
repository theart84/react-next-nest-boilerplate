import { FC } from 'react';

import { IWithState, withState } from '@features/About/hocs/withState';

export const AboutComponent: FC<IWithState> = ({
  state,
  tick,
  increment,
  decrement,
}) => {
  throw new Error('Test error');

  return (
    <div>
      name: {state.name} surname: {state.surname} tick: {tick}
      <button type='button' onClick={increment}>
        Plus
      </button>
      <button type='button' onClick={decrement}>
        Decrement
      </button>
    </div>
  );
};

export const About = withState(AboutComponent);
