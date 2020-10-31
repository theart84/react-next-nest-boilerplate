import { EnhancedStore } from '@reduxjs/toolkit';

import { IRootState } from '@common/redux/store';
import { ConfigNames } from '@common/enums/ConfigNames';

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    __NEXT_REDUX_STORE__?: EnhancedStore<IRootState>;
  }

  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      NODE_ENV: ConfigNames;
      NEST_SERVER_PORT: string;
    }
  }
}
