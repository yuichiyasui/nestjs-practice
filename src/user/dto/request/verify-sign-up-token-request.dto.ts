import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifySignUpTokenRequestDto {
  @ApiProperty({
    example: 'a3c68fa7-896c-46eb-8e7b-cb854aef63d0',
    title: 'ユーザー登録用のトークン',
  })
  @IsNotEmpty()
  @IsString()
  readonly signUpToken!: string;
}
