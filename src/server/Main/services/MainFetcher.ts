import { IMain } from '@common/api/dto/Main/IMain';

export abstract class MainFetcher {
  public abstract getMain(): IMain;
}
