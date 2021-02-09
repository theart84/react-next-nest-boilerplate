import 'reflect-metadata';

import { BasePage } from '@e2e/services/BasePage';
import { BaseComponent } from '@e2e/services/components/BaseComponent';

/**
 * Декоратор, который находит элемент на странице по data-атрибуту testid
 * @param {string} testId
 */
export function FindByTestId(testId: string) {
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
        const promise = (this as BasePage).browser.findElementByTestId(testId);

        return new Type(promise);
      },
    } as never) as void;
  };
}
