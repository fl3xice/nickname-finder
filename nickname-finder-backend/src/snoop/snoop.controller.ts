import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import CreateSearchDto from './dto/CreateSearchDto';
import { SnoopService } from './snoop.service';

@Controller('snoop')
export class SnoopController {
  constructor(private snoopService: SnoopService) {}

  @Post('/search')
  async search(@Body() body: CreateSearchDto) {
    return this.snoopService.search(body.nickname, body.again);
  }

  @Get('/check/:nickname')
  async checkStatus(@Param('nickname') nickname: string) {
    return this.snoopService.checkStatus(nickname);
  }

  @Get('/get/:nickname')
  async getDataOfNickname(@Param('nickname') nickname: string) {
    return await this.snoopService.getData(nickname);
  }
}
