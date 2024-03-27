import { CategoryEntity } from '../entities/category.entity';
import { Category } from 'src/category/domain/category';

export class CategoryMapper {
  static toDomain(raw: CategoryEntity): Category {
    const category = new Category();
    category.id = raw.id;

    category.name = raw.name;
    category.color = raw.color;
    category.icon = raw.icon;
    category.create_by = raw.create_by;
    category.courses_count = raw.courses_count;

    category.createdAt = raw.createdAt;
    category.deletedAt = raw.deletedAt;

    return category;
  }

  static toPersistence(category: Category): CategoryEntity {
    const categoryEntity = new CategoryEntity();
    if (category.id && typeof category.id === 'number') {
      categoryEntity.id = category.id;
    }

    categoryEntity.color = category.color;
    categoryEntity.icon = category.icon;
    categoryEntity.name = category.name;
    categoryEntity.create_by = category.create_by;
    categoryEntity.courses_count = category.courses_count;

    categoryEntity.createdAt = new Date();
    categoryEntity.deletedAt = category.deletedAt;

    return categoryEntity;
  }
}
