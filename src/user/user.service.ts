import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcrypt';

import { uuid } from 'src/libs/uuid';
import { VerifySignUpTokenResponseDto } from './dto/response/verify-sign-up-token-response.dto';
import { SignUpRequestDto } from './dto/request/sign-up-request.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly prisma: PrismaService,
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

  async signUp(body: SignUpRequestDto) {
    const cacheKey = `signUpEmail:${body.signUpToken}`;
    const email = await this.cacheManager.get(cacheKey);
    if (typeof email !== 'string') {
      // TODO: 認証切れ
      throw new Error();
    }

    const saltRounds = 5;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds);

    let createdUser;
    try {
      createdUser = await this.prisma.user.create({
        data: {
          name: body.userName,
          password: hashedPassword,
          email,
        },
      });
    } catch (error) {
      // TODO: エラーハンドリング
      throw new Error();
    }

    await this.cacheManager.del(cacheKey);

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: '[Todo App] ユーザー登録完了',
        template: 'sign-up-complete',
        context: {
          userName: createdUser.name,
          signInUrl: `${process.env.CLIENT_ORIGIN_URL}/sign-in`,
        },
      });
    } catch (error) {
      // TODO: サーバーエラー
      throw new Error();
    }
  }
}
