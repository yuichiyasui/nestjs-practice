import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendSignUpEmailDto {
  @ApiProperty({
    example: 'hoge@example.com',
    title: 'メールアドレス',
  })
  @IsEmail()
  readonly email!: string;
}
