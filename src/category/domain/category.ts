export class Category {
  id: number | string;
  name: string;
  color: string;
  background_color?: string;
  icon: string;
  courses_count: number;
  create_by: number;
  createdAt: Date;
  deletedAt: Date;
}
