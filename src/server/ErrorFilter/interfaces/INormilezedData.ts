import { SystemErrors } from '@common/enums/SystemErrors';

export interface INormalizedData {
  code: SystemErrors;
  data: Record<string, unknown>;
  name: string;
  message: string;
  stack: string;
  error: Error;
}
