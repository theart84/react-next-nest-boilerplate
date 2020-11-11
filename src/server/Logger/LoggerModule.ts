import { Module } from '@nestjs/common';

import { LoggerService } from '@server/Logger/services/LoggerService';

@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
