import { FC } from 'react';
import LinkBase from 'next/link';
import { LinkProps } from 'next/dist/client/link';

import { Page } from '@common/enums/Page';
import { getPageRoute } from '@common/utils/routing/getPageRoutes';

export interface IProps extends LinkProps {
  href: Page;
}

export const Link: FC<IProps> = ({ href, children, ...props }) => (
  <LinkBase
    href={href === Page.INDEX ? '/views/Index' : href}
    as={getPageRoute(href)}
    {...props}
  >
    {children}
  </LinkBase>
);
