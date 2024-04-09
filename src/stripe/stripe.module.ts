import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import { coursesModule } from 'src/courses/course.module';

@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeController],
      imports: [ConfigModule.forRoot() ,coursesModule],
      providers: [
        StripeService,
        {
          provide: 'STRIPE_API_KEY',
          useFactory: () =>
            'pk_test_51P2gF0I1E43qi5XiLj7rkf7TiSuRGdMho9Vh4k2QeuIH10naEyqdB8PzFb2ceEHCCXNXpYHKUVllVkDsNV6Lx8Tp00iCcJZi1o',
          inject: [ConfigService],
        },
      ],
    };
  }
}
