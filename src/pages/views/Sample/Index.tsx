import { Main } from '@features/Main/Main';
import { About } from '@features/About/About';
import { Link } from '@components/Link/Link';
import { Page } from '@common/enums/Page';
import { IBaseNextPage } from '@common/types/IBaseNextPage';
import { Feature } from '@common/enums/Feature';

export const SampleIndexPage: IBaseNextPage<Page.SAMPLE> = () => (
  <div>
    <Main />
    <About />
    <div>
      <Link href={Page.INDEX}>To index</Link>
    </div>
  </div>
);

SampleIndexPage.page = Page.SAMPLE;

SampleIndexPage.features = [Feature.MAIN, Feature.ABOUT];

export { SampleIndexPage as default };
