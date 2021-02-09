import webdriver, {
  By,
  ThenableWebDriver,
  WebElementPromise,
} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import { path } from 'chromium';
import { path as chromeDriverPath } from 'chromedriver';

import { WaitCondition } from '@e2e/types/WaitCondition';

/**
 * Класс, описывающий браузер (обертка на драйвером силениума)
 */
export class Browser {
  private readonly driver: ThenableWebDriver;

  public constructor(name = 'chrome') {
    /**
     * Опции для хрома. Его работу обеспечивают две библиотеки:
     * [Chrome Webdriver]{@link https://www.npmjs.com/package/chromedriver}
     * [Chromium]{@link https://www.npmjs.com/package/chromium}
     * Для корректной работы необходимы подходящие друг другу версии драйвера и хрома
     * Путь до бинарника указывается с помощью метода setChromeBinaryPath
     * Версии драйвера и ревизии хрома указаны в файле .npmrc
     */
    const chromeOptions = new chrome.Options()
      .headless()
      .setChromeBinaryPath(path)
      .addArguments('--window-size=1920,1080')
      .addArguments('--remote-debugging-port=9222')
      .addArguments('--disable-gpu')
      .addArguments('--no-sandbox');

    const service = new chrome.ServiceBuilder(chromeDriverPath);

    this.driver = new webdriver.Builder()
      .forBrowser(name)
      .setChromeService(service)
      .setChromeOptions(chromeOptions)
      .build();
  }

  /**
   * Завершает процесс браузера
   */
  public destroy(): void {
    void this.driver.quit();
  }

  /**
   * Осуществляет переход между страницами
   */
  public async navigate(url: string): Promise<void> {
    await this.driver.get(url);
  }

  /**
   * Ищет на странице элемент по css селектору
   */
  public findElementBySelector(selector: string): WebElementPromise {
    return this.driver.findElement(By.css(selector));
  }

  /**
   * Ищет на странице элемент по id
   */
  public findElementById(id: string): WebElementPromise {
    return this.driver.findElement(By.id(id));
  }

  /**
   * Ищет на странице элемент по xpath
   */
  public findElementByXpath(xpath: string): WebElementPromise {
    return this.driver.findElement(By.xpath(xpath));
  }

  /**
   * Ищет на странице элемент по data-атрибуту testid
   */
  public findElementByTestId(testId: string): WebElementPromise {
    return this.driver.findElement(By.css(`[data-testid=${testId}]`));
  }

  /**
   * Ждет выполнение промиса
   */
  public async wait(condition: WaitCondition): Promise<void> {
    await this.waitAny(condition);
  }

  /**
   * Ждет выполнение любого из переданных промисов
   */
  public async waitAny(
    conditions: WaitCondition | WaitCondition[],
  ): Promise<void> {
    const all = !Array.isArray(conditions) ? [conditions] : conditions;

    await this.driver.wait(async () => {
      // eslint-disable-next-line no-restricted-syntax
      for (const condition of all) {
        try {
          // eslint-disable-next-line no-await-in-loop
          if (await condition(this)) {
            return true;
          }
        } catch {
          //
        }
      }

      return false;
    });
  }
}
