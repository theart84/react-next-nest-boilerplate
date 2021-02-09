import { Response } from 'express';
import path from 'path';
import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';

import { DevGuard } from '@common/guards/DevGuard';

@Controller('/dev/storybook')
@UseGuards(DevGuard)
export class StorybookController {
  @Get()
  public get(@Res() response: Response): void {
    response.sendFile(
      path.join(process.cwd(), 'storybook-static', 'index.html'),
    );
  }

  @Get(':file')
  public getFile(@Res() response: Response, @Param('file') file: string): void {
    response.sendFile(path.join(process.cwd(), 'storybook-static', file));
  }
}
