import { Test } from '@nestjs/testing';

import { SampleController } from '@server/Page/controllers/SampleController';
import { SamplePageService } from '@server/Page/services/SamplePageService';
import { SamplePageServiceMock } from '@server/Page/__mock__/SamplePageServiceMock';
import { AboutModule } from '@server/About/AboutModule';
import { MainModule } from '@server/Main/MainModule';

/**
 * Пример теста, покрывающего контроллер
 */
describe('SampleController', () => {
  let sampleController: SampleController;
  let samplePageService: SamplePageService;

  beforeAll(async () => {
    /**
     * Создаем тестовый модуль
     */
    const moduleRef = await Test.createTestingModule({
      imports: [AboutModule, MainModule],
      controllers: [SampleController],
      providers: [
        /**
         * Переопределяем сервисы моковыми сервисами
         */
        {
          provide: SamplePageService,
          useClass: SamplePageServiceMock,
        },
      ],
    }).compile();

    /**
     * Достаем из контейнера экземпляр сервиса
     */
    samplePageService = moduleRef.get(SamplePageService);

    /**
     * Достаем из контейнера экземпляр контроллера
     */
    sampleController = moduleRef.get(SampleController);
  });

  test('Index page', () => {
    /**
     * Вызываем метод контроллера и ожидаем получить в ответ результат ответа из сервиса
     */
    expect(sampleController.index()).toStrictEqual(
      samplePageService.getIndex(),
    );
  });
});
