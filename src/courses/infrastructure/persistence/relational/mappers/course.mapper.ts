import { Course } from 'src/courses/domain/course';
import { CourseEntity } from '../entities/course.entity';
import { ChapterMapper } from 'src/chapter/infrastructure/persistence/relational/mappers/chapter.mapper';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';
import { FileMapper } from 'src/files/infrastructure/persistence/relational/mappers/file.mapper';

export class CourseMapper {
  static toDomain(raw: CourseEntity): Course {
    const course = new Course();
    course.id = raw.id;
    course.title = raw.title;
    course.subtitle = raw.subtitle;
    course.course_topic = raw.course_topic;
    course.course_category = raw.course_category;
    course.course_sub_category = raw.course_sub_category;
    course.course_language = raw.course_language;
    course.subtitle_language = raw.subtitle_language;
    course.course_level = raw.course_level;
    course.durations = raw.durations;
    course.course_thumbnail = raw.course_thumbnail;
    course.course_trailer = raw.course_trailer;
    course.course_descriptions = raw.course_descriptions;
    course.course_content = raw.course_content;
    course.target_audience = raw.target_audience;
    course.course_requirements = raw.course_requirements;
    course.course_curriculum = raw.course_curriculum;
    course.instructor = raw.instructor;
    course.isDraft = raw.isDraft;
    if (raw.course_thumbnail) {
      course.course_thumbnail = FileMapper.toDomain(raw.course_thumbnail);
    } 
    course.welcome_message = raw.welcome_message;
    course.congratulation_message = raw.congratulation_message;
    course.course_price = raw.course_price;
    course.enrollmentCount = raw.enrollmentCount;
    course.discount = raw.discount;
    course.chapters = raw.chapters?.map((chapter) => ChapterMapper.toDomain(chapter));
    course.createdAt = raw.createdAt;
    course.updatedAt = raw.updatedAt;
    course.deletedAt = raw.deletedAt;
    course.rating = raw.rating;
    return course;
  }

  static toPersistence(course: Course): CourseEntity {
    const courseEntity = new CourseEntity();
    courseEntity.id = course.id as string;
    courseEntity.title = course.title!;
    courseEntity.subtitle = course.subtitle!;
    courseEntity.course_category = course.course_category as any; 
    courseEntity.course_sub_category = course.course_sub_category as any; 
    courseEntity.course_language = course.course_language as any; 
    courseEntity.subtitle_language = course.subtitle_language as any; 
    courseEntity.course_level = course.course_level as any;
    courseEntity.durations = course.durations!;
    courseEntity.course_topic = course.course_topic;
    if (course.course_thumbnail) {
      courseEntity.course_thumbnail = new FileEntity();
      courseEntity.course_thumbnail.id = course.course_thumbnail.id;
      courseEntity.course_thumbnail.path = course.course_thumbnail.path;
    } else if (courseEntity.course_thumbnail === null) {
      courseEntity.course_thumbnail = undefined;
    } 
    courseEntity.course_trailer = course.course_trailer;
    courseEntity.course_descriptions = course.course_descriptions;
    courseEntity.course_content = course.course_content;
    courseEntity.target_audience = course.target_audience;
    courseEntity.course_requirements = course.course_requirements;
    courseEntity.isDraft = course.isDraft;

    courseEntity.course_curriculum = course.course_curriculum;
    courseEntity.instructor = course.instructor as any[]; // Assuming UserEntity
    courseEntity.welcome_message = course.welcome_message!;
    courseEntity.congratulation_message = course.congratulation_message!;
    courseEntity.course_price = course.course_price!;
    courseEntity.discount = course.discount!;
    courseEntity.chapters = course.chapters?.map((chapter) => ChapterMapper.toPersistence(chapter));
    
    courseEntity.createdAt = course.createdAt;
    courseEntity.updatedAt = course.updatedAt;
    courseEntity.deletedAt = course.deletedAt;

    return courseEntity;
  }
}
