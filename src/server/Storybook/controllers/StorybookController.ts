import { Response } from 'express';
import path from 'path';
import { Controller, Get, Param, Res } from '@nestjs/common';

@Controller('/storybook/')
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
