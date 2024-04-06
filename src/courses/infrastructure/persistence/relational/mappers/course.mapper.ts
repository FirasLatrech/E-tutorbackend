import { Course } from 'src/courses/domain/course';
import { CourseEntity } from '../entities/course.entity';

export class CourseMapper {
  static toDomain(raw: CourseEntity): Course {
    const course = new Course();
    course.id = raw.id;
    course.title = raw.title;

    course.subtitle = raw.subtitle;

    course.course_categories = raw.course_category;

    course.course_sub_category = raw.course_sub_category;
    // course.course_to = raw.course_topic;
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
    course.welcome_message = raw.welcome_message;
    course.congratulation_message = raw.congratulation_message;
    course.course_price = raw.course_price;
    course.enrollmentCount = raw.enrollmentCount;
    course.discount = raw.discount;
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

    // courseEntity.course_category = course.course_categories;
    // courseEntity.course_sub_category = course.course_sub_category;
    // courseEntity.course_topic = course.course_topic!;
    // courseEntity.course_language = course.course_language;
    // courseEntity.subtitle_language = course.subtitle_language;
    // courseEntity.course_level = course.course_level;
    courseEntity.durations = course.durations!;
    courseEntity.course_thumbnail = course.course_thumbnail;
    courseEntity.course_trailer = course.course_trailer;
    courseEntity.course_descriptions = course.course_descriptions;
    courseEntity.course_content = course.course_content;
    courseEntity.target_audience = course.target_audience;
    courseEntity.course_requirements = course.course_requirements;
    courseEntity.course_curriculum = course.course_curriculum;
    // courseEntity.instructor = course.instructor!;
    courseEntity.welcome_message = course.welcome_message!;
    courseEntity.congratulation_message = course.congratulation_message!;
    courseEntity.course_price = course.course_price!;
    courseEntity.discount = course.discount!;
    courseEntity.createdAt = course.createdAt;
    courseEntity.updatedAt = course.updatedAt;
    courseEntity.deletedAt = course.deletedAt;
    return courseEntity;
  }
}
