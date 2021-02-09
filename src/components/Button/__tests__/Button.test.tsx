import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Button } from '@components/Button/Button';
import { ButtonTestId } from '@components/Button/enums/ButtonTestId';

describe('Button component', () => {
  test('Rendered', () => {
    const { getByTestId } = render(
      <Button data-testid={ButtonTestId.ID} width={100}>
        Default button
      </Button>,
    );

    expect(getByTestId(ButtonTestId.ID)).toHaveTextContent('Default button');
  });
});
