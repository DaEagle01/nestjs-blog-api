import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  public login(emaiL: string, possword: string, id: string) {
    this.usersService.findUserById('123');
  }

  public isAuthenticated() {
    return true;
  }
}
