import { Body, Controller, HttpCode, Post } from '@nestjs/common';
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
  @ApiResponse({ status: 200, description: 'Success' })
  sendSignUpEmail(@Body() body: SendSignUpEmailDto) {
    this.userService.sendSignUpEmail(body);
  }
}
