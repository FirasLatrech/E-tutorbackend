import { Exclude, Expose } from 'class-transformer';
import { Course } from 'src/courses/domain/course';
import { FileType } from 'src/files/domain/file';
import { Role } from 'src/roles/domain/role';
import { Status } from 'src/status/domain/status';

export class User {
  id: number | string;

  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  username: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;

  is_instructor: boolean;

  my_courses?: Course[];

  @Exclude({ toPlainOnly: true })
  previousPassword?: string;

  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;
  firstName: string | null;
  lastName: string | null;
  photo?: FileType | null;

  role?: Role | null;
  status?: Status;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
