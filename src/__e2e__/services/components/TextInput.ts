import { Key, WebElementPromise } from 'selenium-webdriver';

import { BaseComponent } from '@e2e/services/components/BaseComponent';

/**
 * Класс, описывающий текстовое поле
 */
export class TextInput extends BaseComponent {
  public constructor(element: WebElementPromise) {
    super(element);
  }

  /**
   * Печатает текст в текстовом поле
   */
  public type(text: string): Promise<void> {
    return this.element.sendKeys(text);
  }

  /**
   * Очищает текстовое поле
   */
  public clear(): Promise<void> {
    return this.element.sendKeys(Key.chord(Key.SHIFT, Key.HOME, Key.DELETE));
  }

  /**
   * Получает значение текстового поля
   */
  public getValue(): Promise<string> {
    return this.element.getAttribute('value');
  }
}
