import { Module } from '@nestjs/common';

import { SystemErrorFactory } from '@server/SystemError/factories/SystemErrorFactory';

@Module({
  providers: [SystemErrorFactory],
  exports: [SystemErrorFactory],
})
export class SystemErrorModule {}
