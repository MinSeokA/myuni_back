import { CreateUniversityApplicationDto } from './create-university-application.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUniversityApplicationDto extends PartialType(CreateUniversityApplicationDto) {}
