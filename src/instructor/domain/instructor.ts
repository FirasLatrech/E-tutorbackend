import { Exclude, Expose } from 'class-transformer';
import { FileType } from 'src/files/domain/file';
import { Role } from 'src/roles/domain/role';
import { Status } from 'src/status/domain/status';

export class Instructor {
  id: number | string;

  bio: string;
  // @ManyToOne(() => User, (user) => user.instructors)
  // user: User;
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
