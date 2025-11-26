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
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('{/:id}')
  @ApiOperation({ summary: 'Fetch a list of users or a single user by ID' })
  @ApiResponse({
    status: 200,
    description: 'Fetched a list of users or a single user by ID',
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
  public getUsersOrOne(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUsersParamDto, limit, page);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    console.log(createUserDto instanceof CreateUserDto);
    return 'Create a new user';
  }

  @Patch()
  public updateUser(@Body() patchUserDto: PatchUserDto) {
    console.log(patchUserDto);
    return 'Update a user';
  }
}
