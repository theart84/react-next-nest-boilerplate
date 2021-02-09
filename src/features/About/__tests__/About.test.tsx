import { fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { About } from '@features/About/About';
import { AboutTestId } from '@features/About/enums/AboutTestId';
import { renderWithRedux } from '@common/utils/test/renderWithRedux';

describe('About component', () => {
  test('Tick counter exists', () => {
    const { getByTestId } = renderWithRedux(<About />);

    expect(getByTestId(AboutTestId.TICK)).toHaveTextContent('0');
  });

  test('Tick counter modifier', () => {
    const { getByTestId } = renderWithRedux(<About />);

    fireEvent.click(getByTestId(AboutTestId.INCREMENT));
    expect(getByTestId(AboutTestId.TICK)).toHaveTextContent('1');

    fireEvent.click(getByTestId(AboutTestId.DECREMENT));
    expect(getByTestId(AboutTestId.TICK)).toHaveTextContent('0');
  });

  test('Tick submit form', async () => {
    const { getByTestId } = renderWithRedux(<About />);

    const testText = 'Hello from react test';

    fireEvent.change(getByTestId(AboutTestId.ABOUT_INPUT_NAME), {
      target: {
        value: testText,
      },
    });

    await waitFor(() =>
      expect(getByTestId(AboutTestId.ABOUT_INPUT_NAME)).toHaveValue(testText),
    );

    fireEvent.click(getByTestId(AboutTestId.ABOUT_SUBMIT));

    await waitFor(
      () =>
        expect(getByTestId(AboutTestId.ABOUT_NAME)).toHaveTextContent(testText),
      {
        timeout: 2_000,
      },
    );
  });
});
