import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { InjectDataSource } from '@nestjs/typeorm';
import { CreateUsersDto } from '../dtos/create-many-user.dto';

@Injectable()
export class CreateManyUsersProvider {
  constructor(
    /** Injecting dataSource */
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  public async createMany(createManyUsersDto: CreateUsersDto) {
    let newUsers: User[] = [];
    // Create Query Runner Instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Connect query runner to datasource
      await queryRunner.connect();

      // Start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request. Please try again later.',
        {
          cause: error,
          description: 'Error connecting to the database.',
        },
      );
    }

    try {
      for (const user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      // if successfull commit
      await queryRunner.commitTransaction();
    } catch (error) {
      // if error rollback
      await queryRunner.rollbackTransaction();
      throw new ConflictException(
        'Could not complete the create many user transaction. Please try again later.',
        {
          description: String(error),
        },
      );
    } finally {
      try {
        // Release query runner
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release the connection', {
          description: String(error),
        });
      }
    }

    return { users: newUsers };
  }
}
