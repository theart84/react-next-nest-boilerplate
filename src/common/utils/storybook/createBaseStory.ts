import { Story } from '@storybook/react';
import { GetProps } from 'react-redux';
import React, { FC, PropsWithChildren } from 'react';

export const createBaseStory = <Component extends FC<GetProps<Component>>>(
  OriginalComponent: Component,
  args?: GetProps<Component>,
): Story<PropsWithChildren<GetProps<Component>>> => {
  const StoryComponent: Story<PropsWithChildren<GetProps<Component>>> = (
    props: GetProps<Component>,
  ) => React.createElement(OriginalComponent, props);

  StoryComponent.args = args;

  return StoryComponent;
};
