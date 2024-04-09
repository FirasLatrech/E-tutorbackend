import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FilesModule } from './files/files.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './database/config/database.config';
import authConfig from './auth/config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './mail/config/mail.config';
import fileConfig from './files/config/file.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './session/session.module';
import { MailerModule } from './mailer/mailer.module';

import { CategoryModule } from './category/category.module';
import { coursesModule } from './courses/course.module';
import { LanguageModule } from './language/language.module';
import { InstructorModule } from './instructor/instructor.module';
import googleConfig from './auth-google/config/google.config';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { RatingModule } from './rating/rating.module';
import { EntityAuditLog } from './audit/infrastructure/persistence/relational/entities/entity-audit-log.entity';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    StripeModule.forRootAsync(),
    TypeOrmModule.forFeature([EntityAuditLog]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        // facebookConfig,
        googleConfig,
        // twitterConfig,
        // appleConfig,
      ],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    UsersModule,
    FilesModule,
    AuthGoogleModule,
    AuthModule,
    InstructorModule,
    LanguageModule,
    RatingModule,
    CategoryModule,
    SessionModule,
    coursesModule,
    MailModule,
    MailerModule,
    HomeModule,
  ],
})
export class AppModule {}
