import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.userRepo.findOne({
      where: { username: dto.username },
    });
    if (existing) {
      throw new ConflictException('Username đã tồn tại');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = this.userRepo.create({
      ...dto,
      password: hashedPassword,
    });

    const saved = await this.userRepo.save(user);

    const { password, ...result } = saved;
    const token = this.issueToken(saved);

    return {
      message: 'Đăng ký thành công',
      token,
      user: result,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({
      where: { username: dto.username },
    });

    if (!user) {
      throw new UnauthorizedException('Username hoặc mật khẩu không đúng');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Username hoặc mật khẩu không đúng');
    }

    const { password, ...result } = user;
    const token = this.issueToken(user);

    return {
      message: 'Đăng nhập thành công',
      token,
      user: result,
    };
  }

  private issueToken(user: User) {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }
}
