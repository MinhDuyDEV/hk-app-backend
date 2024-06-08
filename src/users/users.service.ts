import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  getUserById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateUserById(
    id: string,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    const findUser = this.getUserById(id);
    if (!findUser) throw new NotFoundException('User not found');
    if (data.name) {
      const findUser = await this.prisma.user.findUnique({
        where: { name: data.name as string },
      });
      if (findUser) throw new BadRequestException('Name already exists');
    }
    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUserById(id: string): Promise<boolean> {
    const findUser = this.getUserById(id);
    if (!findUser) throw new NotFoundException('User not found');
    await this.prisma.user.delete({ where: { id } });
    return true;
  }
}
