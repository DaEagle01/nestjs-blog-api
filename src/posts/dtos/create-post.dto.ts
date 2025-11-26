import {
  IsArray,
  IsDate,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto';
import { PostType } from '../enums/postType.enum';
import { PostStatus } from '../enums/postStatus.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'This is a blog title',
    description: 'This is the title for the blog post',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(200)
  title: string;

  @ApiProperty({
    enum: PostType,
    description: "Possible value: 'post' | 'page' | 'story' | 'series'",
  })
  @IsEnum(PostType)
  @IsNotEmpty()
  postType: PostType;

  @ApiProperty({
    description: "For example - 'my-url'",
    example: 'my-blog-post-123',
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

  @ApiProperty({
    enum: PostStatus,
    description:
      "Possible values: 'draft' | 'schedules' | 'review' | 'published'",
  })
  @IsEnum(PostStatus)
  @IsNotEmpty()
  status: PostStatus;

  @ApiPropertyOptional({
    description: 'This is the content of the post',
    example: 'The post content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be thrown',
    example:
      '{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting"\n}',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured image for your blog post',
    example: 'https://example.com/images/nestjs-guide.jpg',
  })
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'The blog post publish date',
    example: '2025-11-25T12:46:33+06:00',
  })
  @IsISO8601()
  @IsNotEmpty()
  @IsOptional()
  publishOn: Date;

  @ApiPropertyOptional({
    description: 'An array of tags passed as string values',
    example: ['nestjs', 'typescript', 'backend', 'nodejs'],
  })
  @IsArray()
  @IsString({ each: true })
  @MinLength(3, { each: true })
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description:
            'The key can be any string identifier for your meta option',
          example: 'sidebarEnabled',
        },
        value: {
          type: 'any',
          description: 'Any value you want to save to the key',
          example: true,
        },
      },
    },
  })
  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto[];
}
