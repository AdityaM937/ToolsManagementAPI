import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { PartnersLogin } from '../../partners_login/entities/partners_login.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class UserExistStrategy extends PassportStrategy(Strategy, 'user-exist') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  public async validate(username: string, password : string): Promise<PartnersLogin> {
    const user = await this.authService.validateUser(username, password);
    return user;
  }
}