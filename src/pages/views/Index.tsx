import { Link } from '@components/Link/Link';
import { Page } from '@common/enums/Page';
import { IBaseNextPage } from '@common/types/IBaseNextPage';

export const IndexPage: IBaseNextPage<Page.INDEX> = () => (
  <div>
    <Link href={Page.SAMPLE}>Sample page</Link>
    <Link href={Page.SAMPLE_TEST}>Sample test page</Link>
    <Link href={Page.INFO}>Info page</Link>
  </div>
);

IndexPage.page = Page.INDEX;

export { IndexPage as default };
