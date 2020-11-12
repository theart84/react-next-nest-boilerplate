import { Module } from '@nestjs/common';

import { SystemValidationErrorFactory } from '@server/SystemValidationError/factories/SystemValidationErrorFactory';

@Module({
  providers: [SystemValidationErrorFactory],
})
export class SystemValidationErrorModule {}
