import { NodeEnvs } from '@common/enums/NodeEnvs';
import { ConfigNames } from '@common/enums/ConfigNames';

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      [ConfigNames.NODE_ENV]: NodeEnvs;
      [ConfigNames.NEST_SERVER_PORT]: string;
      [ConfigNames.NEST_LOG_PATH]: string;
    }
  }
}
