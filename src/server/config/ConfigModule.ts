import { Global, Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';

@Global()
@Module({
  imports: [NestConfigModule],
  providers: [ConfigService],
})
export class ConfigModule {}
