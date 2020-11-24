import { Module } from '@nestjs/common';

import { ErrorNextController } from '@server/ErrorNext/controllers/ErrorNextController';

@Module({
  controllers: [ErrorNextController],
})
export class ErrorNextModule {}
