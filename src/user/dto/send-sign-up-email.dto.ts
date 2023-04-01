import { ApiProperty } from '@nestjs/swagger';

export class SendSignUpEmailDto {
  @ApiProperty()
  readonly email!: string;
}
