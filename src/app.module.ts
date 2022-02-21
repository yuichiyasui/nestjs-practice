import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { logger } from './logger.middleware';
import { ShopController } from './shop/shop.controller';
import { ShopModule } from './shop/shop.module';

@Module({
  imports: [ShopModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(ShopController);
  }
}
