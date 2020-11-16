import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { ConfigService } from '@server/Config/services/ConfigService';
import { SystemErrorModule } from '@server/SystemError/SystemErrorModule';

@Module({
  imports: [NestConfigModule, SystemErrorModule],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
