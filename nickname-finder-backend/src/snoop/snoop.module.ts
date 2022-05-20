import { Module } from '@nestjs/common';
import { SnoopController } from './snoop.controller';
import { SnoopService } from './snoop.service';

@Module({
  controllers: [SnoopController],
  providers: [SnoopService]
})
export class SnoopModule {}
