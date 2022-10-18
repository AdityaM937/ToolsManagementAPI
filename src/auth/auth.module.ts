import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PartnersLoginModule } from '../partners_login/partners_login.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { UserAuthStrategy } from './strategies/user-auth.strategy';
import { UserExistStrategy } from './strategies/user-exist.strategy';

@Module({
  imports: [forwardRef(() => PartnersLoginModule),
   // PartnersLoginModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' }
    }),
  ],
  providers: [AuthService, UserExistStrategy, UserAuthStrategy],
  exports: [PassportModule,AuthService],
})
export class AuthModule {}