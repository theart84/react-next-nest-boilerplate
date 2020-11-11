import { NodeEnvs } from '@common/enums/NodeEnvs';
import { ConfigNames } from '@common/enums/ConfigNames';

export interface IProcessEnv {
  [ConfigNames.NODE_ENV]: NodeEnvs;
  [ConfigNames.NEST_SERVER_PORT]: string;
  [ConfigNames.NEST_LOG_PATH]: string;
}
