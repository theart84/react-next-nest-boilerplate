import { IInfoResponse } from '@common/api/dto/Page/IInfoResponse';

export abstract class InfoPageService {
  public abstract index(): IInfoResponse;
}
