import { Main } from '@features/Main/Main';
import { About } from '@features/About/About';
import { Link } from '@components/Link/Link';
import { Pages } from '@common/enums/Pages';
import { IBaseNextPage } from '@common/pages/types/IBaseNextPage';
import { aboutSlice } from '@features/About/duck/slice';
import { mainSlice } from '@features/Main/duck/slice';

const Index: IBaseNextPage<Pages.SAMPLE> = () => (
  <div>
    <Main />
    <About />
    <div>
      <Link href={Pages.INDEX}>To index</Link>
    </div>
  </div>
);

Index.init = async ({ query, store, isServer, apiService }) => {
  const payload = isServer ? query : (await apiService.index()).payload;

  store.dispatch(aboutSlice.actions.setState(payload.features.about));
  store.dispatch(mainSlice.actions.setState(payload.features.main));
};

export { Index as default };
