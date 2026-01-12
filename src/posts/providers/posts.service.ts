import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { Tag } from 'src/tags/tag.entity';
import { TagsService } from 'src/tags/providers/tag.service';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    /**
     * Inject post repository
     */
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    /**
     * Inject metaoption repository
     */
    @InjectRepository(MetaOption)
    private readonly metaOptionRepository: Repository<MetaOption>,

    /**
     * Inject tag service
     */
    private readonly tagsService: TagsService,
  ) {}

  public async create(@Body() createPostDto: CreatePostDto) {
    let author = await this.usersService.findUserById(createPostDto.authorId);

    if (!author) {
      throw new BadRequestException('Author not found');
    }

    let tags: Tag[] = [];
    if (createPostDto.tags) {
      try {
        tags = await this.tagsService.findMultipleTags(createPostDto.tags);
      } catch (error) {
        throw new RequestTimeoutException(
          'Unable to process your request. Please try again later.',
          {
            cause: error,
            description: 'Error connecting to the database.',
          },
        );
      }

      if (tags.length !== createPostDto.tags.length) {
        throw new BadRequestException('Please check your tag IDs');
      }
    }

    // create post
    let post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    try {
      // return the post
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request. Please try again later.',
        {
          cause: error,
          description: 'Error connecting to the database.',
        },
      );
    }
  }

  public async findAll(userId: string) {
    let posts = await this.postsRepository.find({
      // no need to explicitly define relations if we use eager: true in the entity
      // relations: {
      //   metaOptions: true,
      //   author: true,
      //   tags: true,
      // },
    });

    return posts;
  }

  public async update(patchPostDto: PatchPostDto) {
    let post;

    try {
      post = await this.postsRepository.findOneBy({ id: patchPostDto.id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request. Please try again later.',
        {
          cause: error,
          description: 'Error connecting to the database.',
        },
      );
    }

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (patchPostDto.tags) {
      try {
        const tags = await this.tagsService.findMultipleTags(patchPostDto.tags);

        if (tags.length !== patchPostDto.tags.length) {
          throw new BadRequestException(
            'Please check your tag IDs and ensure they are correct.',
          );
        }

        post.tags = tags;
      } catch (error) {
        throw new RequestTimeoutException(
          'Unable to process your request. Please try again later.',
          {
            cause: error,
            description: 'Error connecting to the database.',
          },
        );
      }
    }

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;

    post.postStatus = patchPostDto.postStatus ?? post.postStatus;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;

    if (patchPostDto.metaOptions) {
      if (post.metaOptions) {
        post.metaOptions.metaValue = patchPostDto.metaOptions.metaValue;
      } else {
        post.metaOptions = this.metaOptionRepository.create(
          patchPostDto.metaOptions,
        );
      }
    }

    if (patchPostDto.authorId) {
      const author = await this.usersService.findUserById(
        patchPostDto.authorId,
      );
      if (!author) {
        throw new BadRequestException('Author not found');
      }
      post.author = author;
    }

    try {
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request. Please try again later.',
        {
          cause: error,
          description: 'Error connecting to the database.',
        },
      );
    }
  }

  public async delete(id: number) {
    try {
      await this.postsRepository.delete(id);

      return { deleted: true, id };
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request. Please try again later.',
        {
          cause: error,
          description: 'Error connecting to the database.',
        },
      );
    }
  }
}
