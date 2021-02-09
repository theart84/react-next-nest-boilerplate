import { NodeEnv } from '@common/enums/NodeEnv';
import { ConfigName } from '@common/enums/ConfigName';

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      [ConfigName.NODE_ENV]: NodeEnv;
      [ConfigName.PUBLIC_NEST_SERVER_PORT]: string;
      [ConfigName.NEST_LOG_PATH]: string;
      [ConfigName.PUBLIC_HTTP_HOST]: string;
      [ConfigName.PUBLIC_HTTP_SCHEME]: string;
      [ConfigName.DISABLE_CONSOLE_LOGGER]: '0' | '1';
      [ConfigName.LOCAL_NEST_SERVER_PORT]: string;
    }
  }
}
