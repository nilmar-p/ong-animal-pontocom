import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { AdministratorEntity } from './entities/administrator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { AdministratorFileEntity } from 'src/file/entities/administrator-file.entity';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([AdministratorEntity, AdministratorFileEntity]),
    FileModule,
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: '1d'
    }
  }),
  PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  controllers: [AdministratorController],
  providers: [AdministratorService, JwtStrategy],
  exports: [PassportModule, JwtModule]
})
export class AdministratorModule { }
