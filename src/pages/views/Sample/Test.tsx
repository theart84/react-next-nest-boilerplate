import { About } from '@features/About/About';
import { IBaseNextPage } from '@common/types/IBaseNextPage';
import { Page } from '@common/enums/Page';
import { Feature } from '@common/enums/Feature';

export const SampleTestPage: IBaseNextPage<Page.SAMPLE_TEST> = () => (
  <div>
    <About />
  </div>
);

SampleTestPage.page = Page.SAMPLE_TEST;

SampleTestPage.features = [Feature.ABOUT];

export { SampleTestPage as default };
