import { Module } from '@nestjs/common';

import { TestReportController } from '@server/TestReport/controllers/TestReportController';

@Module({
  controllers: [TestReportController],
})
export class TestReportModule {}
