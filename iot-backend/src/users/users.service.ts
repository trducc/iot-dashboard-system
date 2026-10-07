import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getProfile(userId: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Không tìm thấy người dùng');

    const { password, ...result } = user;
    return result;
  }

  async updateProfile(userId: number, updateData: Partial<User>) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('Không tìm thấy người dùng');

    if (updateData.full_name !== undefined) user.full_name = updateData.full_name;
    if (updateData.student_id !== undefined) user.student_id = updateData.student_id;
    if (updateData.class_name !== undefined) user.class_name = updateData.class_name;
    if (updateData.github_link !== undefined) user.github_link = updateData.github_link;
    if (updateData.figma_link !== undefined) user.figma_link = updateData.figma_link;
    if (updateData.postman_link !== undefined) user.postman_link = updateData.postman_link;
    if (updateData.pdf_link !== undefined) user.pdf_link = updateData.pdf_link;

    await this.userRepo.save(user);
    const { password, ...result } = user;
    return result;
  }
}
