import { InstructorEntity } from '../entities/instructor.entity';
import { Instructor } from 'src/instructor/domain/instructor';

export class instructorMapper {
  static toDomain(raw: InstructorEntity): Instructor {
    const instructor = new Instructor();
    instructor.id = raw.id;
    instructor.bio = raw.bio;

    instructor.createdAt = raw.createdAt;
    instructor.updatedAt = raw.updatedAt;
    instructor.deletedAt = raw.deletedAt;
    return instructor;
  }

  static toPersistence(instructor: Instructor): InstructorEntity {
    const instructorEntity = new InstructorEntity();
    if (instructor.id && typeof instructor.id === 'number') {
      instructorEntity.id = instructor.id;
    }

    instructorEntity.createdAt = instructor.createdAt;
    instructorEntity.updatedAt = instructor.updatedAt;
    instructorEntity.deletedAt = instructor.deletedAt;
    return instructorEntity;
  }
}
