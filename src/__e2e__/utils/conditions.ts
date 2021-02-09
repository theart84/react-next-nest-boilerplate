import { BaseComponent } from '@e2e/services/components/BaseComponent';
import { Browser } from '@e2e/services/Browser';
import { WaitCondition } from '@e2e/types/WaitCondition';
import { BasePage, INewablePage } from '@e2e/services/BasePage';

export const conditions = {
  /**
   * Проверяет, отображен ли элемент на странице
   */
  elementIsVisible: (locator: () => BaseComponent): WaitCondition => () =>
    locator().isDisplayed(),

  /**
   * Проверяет, отрендерен ли элемент в dom'е
   */
  elementIsPresent: (locator: () => BaseComponent): WaitCondition => () =>
    Promise.resolve(locator() !== undefined),

  /**
   * Проверяет, была ли загружена другая страница
   */
  pageHasLoaded: <Page extends BasePage>(
    page: INewablePage<Page>,
  ): WaitCondition => (browser: Browser) => {
    // eslint-disable-next-line new-cap
    const condition = new page(browser).loadCondition();

    return condition(browser);
  },
};
