import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SigninDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class SignInProvider {
  constructor(
    /** Injecting usersService */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /** Injecting hashing provider */
    private readonly hashingProvider: HashingProvider,

    /** Injecting jwt service */
    private readonly jwtService: JwtService,

    /** Injecting jwtConfiguration */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signIn(signInDto: SigninDto) {
    const { email, password } = signInDto;
    const user = await this.usersService.findOneUserByEmail(email);

    let isEqual = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not compare passwords',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('Invalid credentials', {
        description: 'Invalid credentials',
      });
    }

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
      },
      {
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.expirationTime,
      },
    );

    return { accessToken };
  }
}
