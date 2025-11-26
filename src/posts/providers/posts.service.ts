import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}

  public findAll(userId: string) {
    const user = this.usersService.findUserById(userId);

    return [
      { id: userId, user, post: 'Post one description' },
      { id: userId, user, post: 'Post two description' },
      { id: userId, user, post: 'Post three description' },
    ];
  }
}
