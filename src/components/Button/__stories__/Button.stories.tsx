import { Meta } from '@storybook/react';

import { Button } from '@components/Button/Button';
import { createBaseStory } from '@common/utils/storybook/createBaseStory';
import { createStory } from '@common/utils/storybook/createStory';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

export const Basic = createBaseStory(Button, {
  width: 100,
  children: 'Default button',
});

export const Small = createStory(Basic, {
  width: 200,
  children: 'Small button',
});

export const Large = createStory(Basic, {
  width: 300,
  children: 'Large button',
});
