import {
  Controller,
  Get,
  Post,
  Param,
  Query,
  Body,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUsersDto } from './dtos/create-many-user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Fetch a list of users' })
  @ApiResponse({
    status: 200,
    description: 'Fetched a list of users successfully',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    default: 10,
    description: 'Limit the number of entries to return per request',
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    default: 1,
    description: 'Page number',
  })
  public getUsers(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll({}, limit, page);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch a single user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Fetched user successfully',
  })
  public getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserById(id);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('create-many')
  public createManyUsers(@Body() createManyUsersDto: CreateUsersDto) {
    return this.usersService.createManyUsers(createManyUsersDto);
  }

  @Patch()
  public updateUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return 'Update a user';
  }
}
