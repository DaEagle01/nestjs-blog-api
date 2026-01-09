import {
  IsArray,
  IsDate,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  isNotEmpty,
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
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';
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
  postStatus: PostStatus;

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
  @MaxLength(1024)
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
    description: 'An array of ids of tags',
    example: [1, 2, 3],
  })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  tags?: number[];

  @ApiPropertyOptional({
    type: CreatePostMetaOptionsDto,
    required: false,
    items: {
      type: 'object',
      properties: {
        metavalue: {
          type: 'json',
          description: 'The metaValue is a JSON string',
          example: '{"sidebarEnabled": true}',
        },
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto;

  @ApiProperty({
    description: 'The author id',
    type: 'integer',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsInt()
  authorId: number;
}
