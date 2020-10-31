import { PropsWithChildren, FC } from 'react';

import { Meta, Story } from '@storybook/react';

import { IProps, Button } from '@components/Button/Button';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

export const Basic: Story<PropsWithChildren<IProps>> = Button.bind({});

Basic.args = { width: 100, children: 'Default button' };

export const small: FC = () => <Button width={200}>Small button</Button>;

export const large: FC = () => <Button width={300}>Large button</Button>;
