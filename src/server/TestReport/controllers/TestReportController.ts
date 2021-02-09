import { Response } from 'express';
import path from 'path';
import { Controller, Get, Res, UseGuards } from '@nestjs/common';

import { DevGuard } from '@common/guards/DevGuard';

@Controller()
@UseGuards(DevGuard)
export class TestReportController {
  @Get('/dev/test-report')
  public get(@Res() response: Response): void {
    response.sendFile(path.join(process.cwd(), 'test-report', 'index.html'));
  }
}
