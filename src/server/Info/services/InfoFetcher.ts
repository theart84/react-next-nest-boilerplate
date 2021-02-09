import { IInfo } from '@common/api/dto/Info/IInfo';

export abstract class InfoFetcher {
  public abstract getInfo(): IInfo;
}
