import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { agent } from 'supertest';

import { PageModule } from '@server/Page/PageModule';
import { SamplePageService } from '@server/Page/services/SamplePageService';
import { SamplePageServiceMock } from '@server/Page/__mock__/SamplePageServiceMock';
import { getApiPageRoute } from '@common/utils/routing/getPageRoutes';
import { Page } from '@common/enums/Page';

/**
 * Пример теста, покрывающего модуль
 */
describe('Page module', () => {
  let app: INestApplication;
  let samplePageService: SamplePageService;

  beforeAll(async () => {
    /**
     * Создаем экземпляр модуля
     */
    const moduleRef = await Test.createTestingModule({
      imports: [PageModule],
    })
      /**
       * Переопределяем сервисы моковыми сервисами
       */
      .overrideProvider(SamplePageService)
      .useClass(SamplePageServiceMock)
      .compile();

    /**
     * Создаем экземпляр приложения
     */
    app = moduleRef.createNestApplication();

    /**
     * Достаем из контейнера экземпляр сервиса
     */
    samplePageService = app.get(SamplePageService);

    await app.init();
  });

  test('/GET Sample page', () =>
    /**
     * Делаем запрос по маршруту и ожидаем в ответ получить результат ответа из сервиса
     */
    agent(app.getHttpServer())
      .get(getApiPageRoute(Page.SAMPLE))
      .expect(200)
      .expect({
        code: 200,
        message: '',
        payload: samplePageService.getIndex(),
      }));
});
