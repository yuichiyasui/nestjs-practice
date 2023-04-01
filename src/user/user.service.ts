import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';

import { uuid } from 'src/libs/uuid';
import { VerifySignUpTokenResponseDto } from './dto/response/verify-sign-up-token-response.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async sendSignUpEmail({ email }: { email: string }) {
    const token = uuid();
    const signUpFormUrl = `${process.env.CLIENT_ORIGIN_URL}/sing-up/form?token=${token}`;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: '[Todo App] ユーザー登録',
        template: 'sign-up',
        context: {
          signUpFormUrl,
        },
      });
    } catch (error) {
      throw new Error();
    }

    const ttl = 1000 * 60 * 30; // 30 minutes
    await this.cacheManager.set(`signUpEmail:${token}`, email, ttl);
  }

  async verifySignUpToken({ token }: { token: string }) {
    const maybeEmail = await this.cacheManager.get(`signUpEmail:${token}`);
    if (typeof maybeEmail !== 'string') {
      throw new Error();
    }

    return new VerifySignUpTokenResponseDto({ email: maybeEmail });
  }
}
