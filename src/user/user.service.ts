import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';

import { uuid } from 'src/libs/uuid';

@Injectable()
export class UserService {
  constructor(
    private mailerService: MailerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async sendSignUpEmail({ email }: { email: string }) {
    const token = uuid();

    this.mailerService.sendMail({
      to: email,
      subject: '[Todo App] ユーザー登録',
      text: 'テスト',
    });
    const ttl = 1000 * 60 * 30; // 30 minutes
    await this.cacheManager.set(`signUpEmail:${token}`, email, ttl);
  }
}
