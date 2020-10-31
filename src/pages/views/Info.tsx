import { Info } from '@features/Info/Info';
import { IBaseNextPage } from '@common/pages/types/IBaseNextPage';
import { Pages } from '@common/enums/Pages';
import { infoSlice } from '@features/Info/duck/slice';

const InfoPage: IBaseNextPage<Pages.INFO> = () => (
  <div>
    <Info />
  </div>
);

InfoPage.init = async ({ store, query, apiService, isServer }) => {
  const payload = isServer ? query : (await apiService.index()).payload;

  store.dispatch(infoSlice.actions.setState(payload.features.info));
};

export { InfoPage as default };
