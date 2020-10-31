import { FC, HTMLAttributes } from 'react';

export interface IProps extends HTMLAttributes<HTMLButtonElement> {
  width: number;
}

export const Button: FC<IProps> = ({ width, children, ...props }) => (
  <button style={{ width }} type='button' {...props}>
    {children}
  </button>
);
