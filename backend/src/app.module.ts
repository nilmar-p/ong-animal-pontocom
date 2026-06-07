import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalModule } from './animal/animal.module';
import { AdoptionInterestModule } from './adoption-interest/adoption-interest.module';
import { BreedModule } from './breed/breed.module';
import { DonationModule } from './donation/donation.module';
import { ReportModule } from './report/report.module';
import { ArticleModule } from './article/article.module';
import { ProductThriftModule } from './product-thrift-store/product-thrift.module';
import { OrderThriftModule } from './order-thrift-store/order-thrift.module';
import { AdministratorModule } from './administrator/administrator.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FileModule } from './file/file.module';
import path from 'path';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(process.cwd(), 'files'),
      serveRoot: '/resource/files', // 
    }),
    AnimalModule,
    AdoptionInterestModule,
    BreedModule,
    DonationModule,
    ReportModule,
    ArticleModule,
    ProductThriftModule,
    OrderThriftModule,
    AdministratorModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
