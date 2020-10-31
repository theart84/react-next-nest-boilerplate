import { FC } from 'react';
import LinkBase from 'next/link';

import { Pages } from '@common/enums/Pages';
import { getPageRoute } from '@common/pages/utils/getPageRoutes';

export interface IProps {
  href: Pages;
}

export const Link: FC<IProps> = ({ href, children }) => (
  <LinkBase
    href={href === Pages.INDEX ? '/views/Index' : href}
    as={getPageRoute(href)}
  >
    {children}
  </LinkBase>
);
