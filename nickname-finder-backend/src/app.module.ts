import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SnoopModule } from './snoop/snoop.module';

@Module({
  imports: [SnoopModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
