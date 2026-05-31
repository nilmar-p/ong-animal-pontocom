import { Module } from '@nestjs/common';
import { AdministratorService } from './administrator.service';
import { AdministratorController } from './administrator.controller';
import { AdministratorEntity } from './entities/administrator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([AdministratorEntity]),
  JwtModule.register({
    secret: 'CHAVES',
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
