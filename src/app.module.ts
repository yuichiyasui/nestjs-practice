import {
  MiddlewareConsumer,
  CacheModule,
  Module,
  NestModule,
} from '@nestjs/common';
import { logger } from './logger.middleware';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

const isLocal = () => process.env.NODE_ENV === 'local';

@Module({
  controllers: [UserController],
  providers: [PrismaService, UserService],
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
      template: {
        dir: `${__dirname}/templates`,
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
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
