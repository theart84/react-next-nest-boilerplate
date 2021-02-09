import { WebElementPromise } from 'selenium-webdriver';

import { BaseComponent } from '@e2e/services/components/BaseComponent';

/**
 * Класс, описывающий кнопку
 */
export class Button extends BaseComponent {
  public constructor(element: WebElementPromise) {
    super(element);
  }

  /**
   * Проверяет, является ли кнопка disabled
   */
  public async isDisabled(): Promise<boolean> {
    try {
      return (await this.element.getAttribute('disabled')) === 'disabled';
    } catch {
      return Promise.resolve(false);
    }
  }
}
