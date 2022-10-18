import { PartialType } from '@nestjs/swagger';
import { CreatePartnersLoginDto } from './create-partners_login.dto';

export class UpdatePartnersLoginDto extends PartialType(CreatePartnersLoginDto) {}
