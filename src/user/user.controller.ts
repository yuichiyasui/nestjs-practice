import {
  Body,
  Controller,
  HttpCode,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SendSignUpEmailRequestDto } from './dto/request/send-sign-up-email-request.dto';
import { UserService } from './user.service';
import { VerifySignUpTokenRequestDto } from './dto/request/verify-sign-up-token-request.dto';
import { VerifySignUpTokenResponseDto } from './dto/response/verify-sign-up-token-response.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('send-sign-up-email')
  @HttpCode(200)
  @ApiOperation({ summary: 'ユーザー登録用のメールを送信する' })
  @ApiResponse({ status: HttpStatus.OK, description: '成功時' })
  async sendSignUpEmail(@Body() body: SendSignUpEmailRequestDto) {
    try {
      await this.userService.sendSignUpEmail(body);
    } catch (error) {
      throw new HttpException(
        'メールの送信に失敗しました',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('verify-sign-up-token')
  @HttpCode(200)
  @ApiOperation({ summary: 'ユーザー登録用のトークンを検証する' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: '成功時',
    type: VerifySignUpTokenResponseDto,
  })
  async verifySignUpToken(@Body() body: VerifySignUpTokenRequestDto) {
    try {
      return await this.userService.verifySignUpToken({
        token: body.signUpToken,
      });
    } catch (error) {
      throw new HttpException('エラーが発生しました', HttpStatus.BAD_REQUEST);
    }
  }
}
