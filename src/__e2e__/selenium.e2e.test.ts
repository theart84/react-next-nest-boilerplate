import { waitFor } from '@testing-library/dom';

import { AllPages } from '@e2e/services/AllPages';
import { Browser } from '@e2e/services/Browser';

describe('Selenium tests', () => {
  let pages: AllPages;

  beforeAll(async () => {
    pages = new AllPages(new Browser('chrome'));

    await pages.index.navigate();
  }, 10_000);

  describe('Index page', () => {
    test('First link exists', async () => {
      await pages.index.navigate();

      expect(await pages.index.firstLink.getText()).toContain('Sample page');
    });
  });

  describe('Sample index page', () => {
    test('Tick counter exists', async () => {
      await pages.sampleIndex.navigate();

      expect(await pages.sampleIndex.tick.getText()).toContain('0');
    });

    test('Tick counter modifier', async () => {
      await pages.sampleIndex.navigate();

      await pages.sampleIndex.increment.click();
      expect(await pages.sampleIndex.tick.getText()).toContain('1');

      await pages.sampleIndex.decrement.click();
      expect(await pages.sampleIndex.tick.getText()).toContain('0');
    });

    test('Tick submit form', async () => {
      const testText = 'Hello from selenium test';

      await pages.sampleIndex.navigate();

      await pages.sampleIndex.aboutInputName.clear();

      await pages.sampleIndex.aboutInputName.type(testText);

      await pages.sampleIndex.aboutSubmit.click();

      await waitFor(async () =>
        expect(await pages.sampleIndex.aboutName.getText()).toContain(testText),
      );
    });
  });

  afterAll(() => {
    pages.browser.destroy();
  });
});
