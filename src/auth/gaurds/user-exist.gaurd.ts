import { Injectable} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class UserExistGaurd extends AuthGuard('user-exist') {}