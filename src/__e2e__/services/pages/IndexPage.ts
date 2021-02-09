import { Page } from '@common/enums/Page';
import { BaseComponent } from '@e2e/services/components/BaseComponent';
import { FindBySelector } from '@e2e/decorators/FindBySelector';
import { conditions } from '@e2e/utils/conditions';
import { WaitCondition } from '@e2e/types/WaitCondition';
import { BasePage } from '@e2e/services/BasePage';

export class IndexPage extends BasePage {
  protected page = Page.INDEX;

  @FindBySelector('a')
  public firstLink!: BaseComponent;

  public loadCondition(): WaitCondition {
    return conditions.elementIsVisible(() => this.firstLink);
  }
}
