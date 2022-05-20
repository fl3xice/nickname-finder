import { IsNotEmpty, Length } from 'class-validator';

export default class CreateSearchDto {
  @IsNotEmpty()
  @Length(3, 120)
  nickname: string;

  again: boolean;
}
