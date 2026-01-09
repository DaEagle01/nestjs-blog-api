import { IsJSON, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostMetaOptionsDto {
  @ApiProperty({
    description: 'The metaValue is a JSON string',
    example: '{"sidebarEnabled": true}',
  })
  @IsNotEmpty()
  @IsJSON()
  metaValue: string;
}
