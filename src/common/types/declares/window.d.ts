import { EnhancedStore } from '@reduxjs/toolkit';

import { IRootState } from '@common/redux/store';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    __NEXT_REDUX_STORE__?: EnhancedStore<IRootState>;
  }
}
