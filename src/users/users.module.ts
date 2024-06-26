import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
import { EnconderService } from '../utils/enconder.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersRepository } from 'src/repositories/users.repository';
import { UserService } from './users.service';
import { JwtStrategy } from './jwt-strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: 3600
      }
    }),
    TypeOrmModule.forFeature([UsersRepository])
  ],
  controllers: [UserController],
  providers: [UserService, EnconderService, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
