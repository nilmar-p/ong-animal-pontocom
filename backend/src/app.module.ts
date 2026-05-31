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
import path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgresql',
      database: 'animal_pontocom',
      autoLoadEntities: true,
      synchronize: true,
    }), 
    ServeStaticModule.forRoot({
      rootPath: path.resolve(process.cwd(), 'pictures'),
      serveRoot: '/img/pictures', // http://localhost:3005/img/pictures/
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
