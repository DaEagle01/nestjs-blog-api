import { Module } from '@nestjs/common';
import { MetaOptionsController } from './meta-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOption } from './meta-option.entity';
import { MetaOptionsService } from './providers/meta-options.service';

@Module({
  providers: [MetaOptionsService],
  controllers: [MetaOptionsController],
  imports: [TypeOrmModule.forFeature([MetaOption])],
})
export class MetaOptionsModule {}
