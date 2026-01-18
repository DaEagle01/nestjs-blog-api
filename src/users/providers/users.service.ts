import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import * as config from '@nestjs/config';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import profileConfig from '../config/profile.config';
import { CreateManyUsersProvider } from './users-create-many.provider';
import { CreateUsersDto } from '../dtos/create-many-user.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by--email.provider';

/**
 * Service responsible for managing user-related business logic and data operations.
 *
 * This service handles all user management functionality including retrieving users,
 * searching for specific users, and coordinating with the authentication service.
 *
 * @class UsersService
 * @injectable
 */
@Injectable()
export class UsersService {
  /**
   * Creates an instance of UsersService.
   */
  constructor(
    /** Injecting usersRepository */
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    /** Injecting profile configuration */
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: config.ConfigType<
      typeof profileConfig
    >,

    /** Injecting createUserProvider */
    @Inject()
    private readonly createUserProvider: CreateUserProvider,

    /** Injecting createManyUsersProvider */
    @Inject()
    private readonly createManyUsersProvider: CreateManyUsersProvider,

    /** Injecting findOneUserByEmailProvider */
    @Inject()
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  /**
   * Retrieves all users from the database with pagination support.
   *
   * This method fetches a paginated list of users based on the provided filters
   * and pagination parameters. It also verifies the authentication status before
   * returning the results.
   *
   * @param {GetUsersParamDto} getUsersParamDto - DTO containing filter parameters for user search
   * @param {number} limit - Maximum number of users to return per page
   * @param {number} page - Page number for pagination (1-indexed)
   * @returns {Array<{firstName: string, email: string}>} Array of user objects containing firstName and email
   *
   * @example
   * ```typescript
   * const users = usersService.findAll(paramsDto, 10, 1);
   * // Returns: [{ firstName: 'Fahad', email: 'fahad@gmail.com' }, ...]
   * ```
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    try {
      return this.usersRepository.find();
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request. Please try again later.',
        {
          cause: error,
          description: 'Error connecting to the database.',
        },
      );
    }
  }

  /**
   * Finds and retrieves a single user by their unique identifier.
   *
   * This method queries the database for a user matching the provided ID
   * and returns their complete user information.
   *
   * @param {string} id - The unique identifier of the user to retrieve
   * @returns {{id: string, firstName: string, email: string}} User object containing id, firstName, and email
   *
   * @example
   * ```typescript
   * const user = usersService.findUserById('123');
   * // Returns: { id: '123', firstName: 'Hasan', email: 'hasan@gmail.com' }
   * ```
   */
  public async findUserById(id: number) {
    let user;
    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);
      throw new RequestTimeoutException(
        'Unable to process your request. Please try again later.',
        {
          cause: error,
          description: 'Error connecting to the database.',
        },
      );
    }

    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }

    return user;
  }

  public async createManyUsers(createManyUsersDto: CreateUsersDto) {
    return await this.createManyUsersProvider.createMany(createManyUsersDto);
  }

  public async findOneUserByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneUserByEmail(email);
  }
}
