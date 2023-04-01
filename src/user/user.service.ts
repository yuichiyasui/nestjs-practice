import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UserService {
  constructor(private mailerService: MailerService) {}

  sendSignUpEmail({ email }: { email: string }) {
    this.mailerService.sendMail({
      to: email,
      subject: '[Todo App] ユーザー登録',
      text: 'テスト',
    });
  }
}
