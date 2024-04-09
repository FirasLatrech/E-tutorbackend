import {
  Column,
  AfterLoad,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { RoleEntity } from '../../../../../roles/infrastructure/persistence/relational/entities/role.entity';
import { StatusEntity } from '../../../../../status/infrastructure/persistence/relational/entities/status.entity';
import { FileEntity } from '../../../../../files/infrastructure/persistence/relational/entities/file.entity';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
// We use class-transformer in ORM entity and domain entity.
// We duplicate these rules because you can choose not to use adapters
// in your project and return an ORM entity directly in response.
import { Exclude, Expose } from 'class-transformer';
import { User } from '../../../../domain/user';
import { InstructorEntity } from 'src/instructor/infrastructure/persistence/relational/entities/instructor.entity';
import { CourseEntity } from 'src/courses/infrastructure/persistence/relational/entities/course.entity';
import { Rating } from 'src/rating/domain/rating';
import { RatingEntity } from 'src/rating/infrastructure/persistence/relational/entities/rating.entity';
import { v4 as uuidv4 } from 'uuid'; // Import UUIDv4 generator function

@Entity({
  name: 'user',
})
export class UserEntity extends EntityRelationalHelper implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  // For "string | null" we need to use String type.
  // More info: https://github.com/typeorm/typeorm/issues/2567
  @Column({ type: String, unique: true, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password?: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword?: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @Column({ default: AuthProvidersEnum.email })
  @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @Index()
  @Column({ type: String, nullable: true })
  @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;
  @Index()
  @Column({ type: String, unique: true, nullable: true })
  username: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  photo?: FileEntity | null;

  @ManyToOne(() => RoleEntity, {
    eager: true,
  })
  role?: RoleEntity | null;

  @ManyToOne(() => StatusEntity, {
    eager: true,
  })
  status?: StatusEntity;

  @OneToMany(() => InstructorEntity, (instructor) => instructor.user)
  instructors: InstructorEntity[];
  @Column({ type: Boolean, default: false })
  is_instructor: boolean;
  @ManyToMany(() => CourseEntity, (courses) => courses.instructor)
  my_courses: CourseEntity[];

  @ManyToMany(() => CourseEntity, (courses) => courses.purchase)
  purchase: CourseEntity[];

  @Column({ type: Number, default: 0 })
  totalEnrolmentCount: number;
  @ManyToMany(() => CourseEntity, (courses) => courses.user_courses)
  user_courses: CourseEntity[];

  @OneToMany(() => RatingEntity, (rating) => rating.user)
  rating: Rating[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
