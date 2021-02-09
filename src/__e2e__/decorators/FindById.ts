import 'reflect-metadata';

import { BasePage } from '@e2e/services/BasePage';
import { BaseComponent } from '@e2e/services/components/BaseComponent';

/**
 * Декоратор, который находит элемент на странице по id
 * Предпочтительнее использовать FindByTestId
 * @param {string} id
 * @see FindByTestId
 */
export function FindById(id: string) {
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
        const promise = (this as BasePage).browser.findElementById(id);

        return new Type(promise);
      },
    } as never) as void;
  };
}
