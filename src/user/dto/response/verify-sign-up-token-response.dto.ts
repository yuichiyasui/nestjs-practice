import { ApiProperty } from '@nestjs/swagger';

export class VerifySignUpTokenResponseDto {
  constructor(args: { email: string }) {
    this.email = args.email;
  }

  @ApiProperty({
    example: 'hoge@example.com',
    title: 'メールアドレス',
  })
  readonly email!: string;
}
