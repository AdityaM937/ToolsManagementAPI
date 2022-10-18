import { Injectable, UnauthorizedException  } from '@nestjs/common';
import {JsonWebTokenError} from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserAuthGaurd extends AuthGuard('user-auth') {
    handleRequest(err: any, user: any, info: any, context: any, status: any) {
        if (info instanceof JsonWebTokenError) {
          console.log('error', info);
          throw new UnauthorizedException('Invalid Token!');
        }
    
        return super.handleRequest(err, user, info, context, status);
      }
}