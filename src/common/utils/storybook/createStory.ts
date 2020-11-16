import { Story } from '@storybook/react';
import { GetProps } from 'react-redux';
import { FC, PropsWithChildren } from 'react';

export const createStory = <Component extends FC<GetProps<Component>>>(
  OriginalComponent: Component,
  args?: GetProps<Component>,
): Story<PropsWithChildren<GetProps<Component>>> => {
  const StoryComponent: Story<PropsWithChildren<
    GetProps<Component>
  >> = OriginalComponent.bind({}) as Story<
    PropsWithChildren<GetProps<Component>>
  >;

  StoryComponent.args = args;

  return StoryComponent;
};
