import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'The name of the tag',
    example: 'NestJS',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(256)
  name: string;

  @ApiProperty({
    description: 'The slug of the tag',
    example: 'nestjs-intro',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(256)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'Slug must be lowercase alphanumeric with hyphens (e.g., my-post-slug)',
  })
  slug: string;

  @ApiPropertyOptional({
    description: 'The description of the tag',
    example: 'NestJS is a framework for building server-side applications',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'The schema of the tag',
    example: '{"sidebarEnabled": true}',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'The featured image URL of the tag',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsUrl()
  @MaxLength(1024)
  featuredImageUrl?: string;
}
