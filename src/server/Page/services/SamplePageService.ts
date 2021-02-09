import { ISampleResponse } from '@common/api/dto/Page/ISampleResponse';
import { ISampleTestResponse } from '@common/api/dto/Page/ISampleTestResponse';

export abstract class SamplePageService {
  public abstract getIndex(): ISampleResponse;

  public abstract getTest(): ISampleTestResponse;
}
