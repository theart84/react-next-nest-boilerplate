import { FC } from 'react';
import { Form, Field } from 'react-final-form';

import { IWithState, withState } from '@features/About/hocs/withState';
import { AboutTestId } from '@features/About/enums/AboutTestId';

export const AboutComponent: FC<IWithState> = ({
  state,
  tick,
  increment,
  decrement,
  create,
}) => (
  <div>
    <span data-testid={AboutTestId.TICK}>tick: {tick}</span>
    <button
      type='button'
      data-testid={AboutTestId.DECREMENT}
      onClick={decrement}
    >
      Decrement
    </button>
    <button
      type='button'
      onClick={increment}
      data-testid={AboutTestId.INCREMENT}
    >
      Plus
    </button>
    <br />
    <br />
    <div data-testid={AboutTestId.ABOUT_NAME}>{state.name}</div>
    <Form
      initialValues={state}
      onSubmit={create}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='name'>Name:</label>
            <Field
              name='name'
              component='input'
              data-testid={AboutTestId.ABOUT_INPUT_NAME}
            />
          </div>
          <div>
            <label htmlFor='surname'>Surname:</label>
            <Field name='surname' component='input' />
          </div>
          <div>
            <input
              type='submit'
              value='Submit'
              data-testid={AboutTestId.ABOUT_SUBMIT}
            />
          </div>
        </form>
      )}
    />
    <br />
  </div>
);

export const About = withState(AboutComponent);
