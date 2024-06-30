// src/users/users.controller.ts
import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService  // Inject JwtService
  ) {}

  @Post('signup')
  async signUp(@Body() createUserDto: { username: string; password: string; role: string }) {
    const { username, password, role } = createUserDto;
    const existingUser = await this.usersService.findByUsername(username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
    return this.usersService.create({ username, password, role });
  }

  @Post('login')
  async login(@Body() { username, password }: { username: string; password: string }) {
    const user = await this.usersService.validateUser(username, password);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }
    // Generate JWT token
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload), // Use JwtService to sign the token
    };
  }
}
