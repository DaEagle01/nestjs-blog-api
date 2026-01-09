import { Body, Injectable } from '@nestjs/common';
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
      throw new Error('Author not found');
    }

    let tags: Tag[] = [];
    if (createPostDto.tags) {
      tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    }

    // create post
    let post = this.postsRepository.create({
      ...createPostDto,
      author,
      tags,
    });

    // return the post
    return await this.postsRepository.save(post);
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
    let post = await this.postsRepository.findOneBy({ id: patchPostDto.id });

    if (!post) {
      throw new Error('Post not found');
    }

    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;

    if (patchPostDto.tags) {
      const tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
      post.tags = tags;
    }

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
        throw new Error('Author not found');
      }
      post.author = author;
    }

    return await this.postsRepository.save(post);
  }

  public async delete(id: number) {
    try {
      await this.postsRepository.delete(id);

      return { deleted: true, id };
    } catch (error) {
      throw new Error('The post could not be deleted. Please try again later.');
    }
  }
}
