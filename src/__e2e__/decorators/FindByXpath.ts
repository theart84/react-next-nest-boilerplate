import 'reflect-metadata';

import { BasePage } from '@e2e/services/BasePage';
import { BaseComponent } from '@e2e/services/components/BaseComponent';

/**
 * Декоратор, который находит элемент на странице по xpath
 * @param {string} xpath
 * @see https://www.w3schools.com/xml/xpath_syntax.asp
 */
export function FindByXpath(xpath: string) {
  return (target: BasePage, propertyKey: string): void => {
    const Type: typeof BaseComponent = Reflect.getMetadata(
      'design:type',
      target,
      propertyKey,
    );

    return ({
      configurable: true,
      enumerable: true,
      get() {
        const promise = (this as BasePage).browser.findElementByXpath(xpath);

        return new Type(promise);
      },
    } as never) as void;
  };
}
