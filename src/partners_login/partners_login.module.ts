import { forwardRef, Module } from '@nestjs/common';
import { PartnersLoginService } from './partners_login.service';
import { PartnersLoginController } from './partners_login.controller';
import { CommonModule } from '../common/common.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports:[forwardRef(() => AuthModule),CommonModule, PassportModule],// AuthModule ],
  controllers: [PartnersLoginController],
  providers: [PartnersLoginService],
  exports: [PartnersLoginService]
})
export class PartnersLoginModule {}
