import { Info } from '@features/Info/Info';
import { IBaseNextPage } from '@common/types/IBaseNextPage';
import { Page } from '@common/enums/Page';
import { Feature } from '@common/enums/Feature';

export const InfoPage: IBaseNextPage<Page.INFO> = () => (
  <div>
    <Info />
  </div>
);

InfoPage.page = Page.INFO;

InfoPage.features = [Feature.INFO];

export { InfoPage as default };
