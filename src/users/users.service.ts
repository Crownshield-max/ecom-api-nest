// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma , User} from '@prisma/client'; // Import Prisma and User type
import * as bcrypt from 'bcryptjs';
import { DatabaseService } from 'src/database/database.service';


@Injectable()
export class UsersService {
  constructor(private prisma: DatabaseService) {}

  async create(userData: { username: string; password: string; role: string }): Promise<User> {
    const { username, password, role } = userData;  
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
