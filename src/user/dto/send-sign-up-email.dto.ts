import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class SendSignUpEmailDto {
  @ApiProperty()
  @IsEmail()
  readonly email!: string;
}
