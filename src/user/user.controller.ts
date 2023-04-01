import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendSignUpEmailDto } from './dto/send-sign-up-email.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('send-sign-up-email')
  @HttpCode(200)
  @ApiOperation({ summary: 'ユーザー登録用のメールを送信する' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success' })
  async sendSignUpEmail(@Body() body: SendSignUpEmailDto) {
    try {
      await this.userService.sendSignUpEmail(body);
    } catch (error) {
      throw new HttpException(
        'メールの送信に失敗しました',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
