import { Browser } from '@e2e/services/Browser';
import { WaitCondition } from '@e2e/types/WaitCondition';
import { APP_PUBLIC_URL } from '@common/utils/constants';
import { Page } from '@common/enums/Page';
import { getPageRoute } from '@common/utils/routing/getPageRoutes';

export interface INewablePage<T extends BasePage> {
  new (browser: Browser): T;
}

/**
 * Базовый класс, описывающий страницу. Любая другая страница должна быть унаследована от этого класса
 */
export abstract class BasePage {
  /**
   * В унаследованном классе необходимо определить, какую именно страницу он описывает
   */
  protected abstract page: Page;

  /**
   * Тесты будут обращаться к сайту локально по адресу http://localhost:{port}
   */
  private readonly baseUrl = APP_PUBLIC_URL;

  public constructor(public readonly browser: Browser) {}

  /**
   * Осуществляет переход по адресу страницы страницы и ждет, пока выполнится метод
   * @link BasePage#loadCondition
   */
  public async navigate(): Promise<void> {
    const url = getPageRoute(this.page);

    await this.browser.navigate(`${this.baseUrl}${url}`);
    await this.browser.wait(this.loadCondition());
  }

  /**
   * Возвращает условие, по которому определяется, была ли страница отрисована
   */
  public abstract loadCondition(): WaitCondition;
}
