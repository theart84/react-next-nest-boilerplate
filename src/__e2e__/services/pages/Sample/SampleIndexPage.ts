import { BasePage } from '@e2e/services/BasePage';
import { BaseComponent } from '@e2e/services/components/BaseComponent';
import { conditions } from '@e2e/utils/conditions';
import { WaitCondition } from '@e2e/types/WaitCondition';
import { FindByTestId } from '@e2e/decorators/FindByTestId';
import { AboutTestId } from '@features/About/enums/AboutTestId';
import { Button } from '@e2e/services/components/Button';
import { TextInput } from '@e2e/services/components/TextInput';
import { Page } from '@common/enums/Page';

export class SampleIndexPage extends BasePage {
  protected page = Page.SAMPLE;

  @FindByTestId(AboutTestId.TICK)
  public tick!: BaseComponent;

  @FindByTestId(AboutTestId.INCREMENT)
  public increment!: Button;

  @FindByTestId(AboutTestId.DECREMENT)
  public decrement!: Button;

  @FindByTestId(AboutTestId.ABOUT_INPUT_NAME)
  public aboutInputName!: TextInput;

  @FindByTestId(AboutTestId.ABOUT_NAME)
  public aboutName!: BaseComponent;

  @FindByTestId(AboutTestId.ABOUT_SUBMIT)
  public aboutSubmit!: Button;

  public loadCondition(): WaitCondition {
    return conditions.elementIsVisible(() => this.tick);
  }
}
