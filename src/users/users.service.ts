import { Inject, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { FindManyOptions } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    Object.assign(user, {
      ...createUserDto,
      password: await hash(createUserDto.password, 10),
    });
    const { password, ...userData } = await this.userRepository.save(user);
    return userData;
  }

  find(options?: FindManyOptions<User>) {
    return this.userRepository.find(options);
  }

  findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...updateUserDto });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }
}
