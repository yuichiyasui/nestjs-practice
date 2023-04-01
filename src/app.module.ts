import {
  MiddlewareConsumer,
  CacheModule,
  Module,
  NestModule,
} from '@nestjs/common';
import { logger } from './logger.middleware';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';

const isLocal = () => process.env.NODE_ENV === 'local';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register(),
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT),
        // ignoreTLS: isLocal(),
        // secure: !isLocal(),
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: `"Todo App" <${process.env.MAIL_USER}>`,
      },
      preview: isLocal(),
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(UserController);
  }
}
