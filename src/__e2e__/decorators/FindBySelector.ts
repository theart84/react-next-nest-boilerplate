import 'reflect-metadata';

import { BasePage } from '@e2e/services/BasePage';
import { BaseComponent } from '@e2e/services/components/BaseComponent';

/**
 * Декоратор, который находит элемент на странице по переданному css селектору
 * Предпочтительнее использовать FindByTestId
 * @param {string} selector
 * @see FindByTestId
 */
export function FindBySelector(selector: string) {
  return (target: BasePage, propertyKey: string): void => {
    const Type: typeof BaseComponent = Reflect.getMetadata(
      'design:type',
      target,
      propertyKey,
    );

    /*
    Таким образом можно изменить геттер свойства при использовании ts-jest.
    Но этот способ не работает с babel-jest.
    https://github.com/babel/babel/issues/9773
    Не используем ts-jest, так как нам необходим jsx transform и другие плагины babel'а
     */

    /*
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      get() {
        const promise = (this as BasePage).browser.findElementBySelector(
          selector,
        );

        return new Type(promise, selector);
      },
    });
     */

    /*
    Такой способ работает с babel-jest. Но типизация TS ругается на возвращаемый тип и требует void,
    так как декораторы в babel и ts организованы по-разному
     */
    return ({
      configurable: true,
      enumerable: true,
      get() {
        const promise = (this as BasePage).browser.findElementBySelector(
          selector,
        );

        return new Type(promise);
      },
    } as never) as void;
  };
}
