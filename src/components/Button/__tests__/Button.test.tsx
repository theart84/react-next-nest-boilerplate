import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Button } from '@components/Button/Button';

test('Render Button', () => {
  render(<Button width={100}>Default button</Button>);

  expect(screen.getByText(/button/i)).toHaveAttribute('style');
});
