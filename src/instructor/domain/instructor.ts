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
