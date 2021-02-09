import { IndexPage } from '@e2e/services/pages/IndexPage';
import { Browser } from '@e2e/services/Browser';
import { SampleIndexPage } from '@e2e/services/pages/Sample/SampleIndexPage';

/**
 * Каждая новая страница должна быть добавлена в этот класс
 */
export class AllPages {
  public index: IndexPage;

  public sampleIndex: SampleIndexPage;

  public constructor(public readonly browser: Browser) {
    this.index = new IndexPage(browser);
    this.sampleIndex = new SampleIndexPage(browser);
  }
}
