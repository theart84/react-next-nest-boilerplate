import { Main } from '@features/Main/Main';
import { About } from '@features/About/About';
import { Link } from '@components/Link/Link';
import { Page } from '@common/enums/Page';
import { IBaseNextPage } from '@common/types/IBaseNextPage';
import { aboutSlice } from '@features/About/duck/slice';
import { mainSlice } from '@features/Main/duck/slice';

const Index: IBaseNextPage<Page.SAMPLE> = () => (
  <div>
    <Main />
    <About />
    <div>
      <Link href={Page.INDEX}>To index</Link>
    </div>
  </div>
);

Index.init = async ({ query, store, isServer, apiService }) => {
  const payload = isServer ? query : (await apiService.index()).payload;

  store.dispatch(aboutSlice.actions.setState(payload.features.about));
  store.dispatch(mainSlice.actions.setState(payload.features.main));
};

export { Index as default };
