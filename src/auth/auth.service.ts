import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PartnersLoginService } from '../partners_login/partners_login.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';
import { PartnersLogin } from '../partners_login/entities/partners_login.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => PartnersLoginService))
    private readonly partnersLoginService: PartnersLoginService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<PartnersLogin> {
    const user = await this.partnersLoginService.getPartnerUser(username);
    if (!user) {
      throw new NotFoundException('user not found');
    } else {
      const match = await bcrypt.compare(password, user.password);
      if (match) return user;
      else throw new UnauthorizedException('Wrong password!');
    }
  }

  async login(user: JwtPayloadDto): Promise<{access_token:string}> {
    const payload = { username: user.username, sub: user.password };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
