// DTO: Data Transfer Object
import { IsBoolean, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsBoolean()
  @IsOptional()
  done?: boolean;
}
