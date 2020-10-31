import { Link } from '@components/Link/Link';
import { Pages } from '@common/enums/Pages';
import { IBaseNextPage } from '@common/pages/types/IBaseNextPage';

const Index: IBaseNextPage<Pages.INDEX> = () => (
  <div>
    <Link href={Pages.SAMPLE}>Sample page</Link>
    <Link href={Pages.SAMPLE_TEST}>Sample test page</Link>
    <Link href={Pages.INFO}>Info page</Link>
  </div>
);

export { Index as default };
