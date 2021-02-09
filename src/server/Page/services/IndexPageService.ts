import { IBasePageResponse } from '@common/api/types/IBasePageResponse';

export abstract class IndexPageService {
  public abstract getIndex(): IBasePageResponse;
}
