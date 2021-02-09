import { WebElementPromise } from 'selenium-webdriver';

/**
 * Базовый класс, описывающий элемент, найденный на странице
 */
export class BaseComponent {
  public constructor(protected element: WebElementPromise) {}

  /**
   * Кликает по элементу
   */
  public async click(): Promise<void> {
    try {
      await this.element.click();
    } catch (error) {
      try {
        await this.element
          .getDriver()
          .executeScript('arguments[0].click();', this.element);
      } catch {
        throw error;
      }
    }
  }

  /**
   * Проверяет, отображен ли элемент на странице
   */
  public async isDisplayed(): Promise<boolean> {
    try {
      return await this.element.isDisplayed();
    } catch {
      return false;
    }
  }

  /**
   * Получает текстовое содержимое элемента
   */
  public getText(): Promise<string> {
    return this.element.getText();
  }
}
