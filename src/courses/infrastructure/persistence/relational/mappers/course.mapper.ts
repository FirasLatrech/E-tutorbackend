import { course } from '../../../../domain/course';

import { courseEntity } from '../entities/course.entity';

export class CourseMapper {
  static toDomain(raw: courseEntity): course {
    const courseInstance = new course();
    courseInstance.id = raw.id;
    courseInstance.title = raw.title;

    // courseInstance.subtitle = raw.subtitle;

    // courseInstance.course_categories = raw.course_categories;

    // courseInstance.course_sub_category = raw.course_sub_category;
    // courseInstance.course_topic = raw.course_topic;
    // courseInstance.course_language = raw.course_language;
    // courseInstance.subtitle_language = raw.subtitle_language;
    // courseInstance.course_level = raw.course_level;
    // courseInstance.durations = raw.durations;
    // courseInstance.course_thumbnail = raw.course_thumbnail;
    // courseInstance.course_trailer = raw.course_trailer;
    // courseInstance.course_descriptions = raw.course_descriptions;
    // courseInstance.course_content = raw.course_content;
    // courseInstance.target_audience = raw.target_audience;
    // courseInstance.course_requirements = raw.course_requirements;
    // courseInstance.course_curriculum = raw.course_curriculum;
    // courseInstance.instructor = raw.instructor;
    // courseInstance.welcome_message = raw.welcome_message;
    // courseInstance.congratulation_message = raw.congratulation_message;
    // courseInstance.course_price = raw.course_price;
    // courseInstance.discount = raw.discount;
    // courseInstance.createdAt = raw.createdAt;
    // courseInstance.updatedAt = raw.updatedAt;
    // courseInstance.deletedAt = raw.deletedAt;
    return courseInstance;
  }

  static toPersistence(courseInstance: course): courseEntity {
    const courseEntityInstance = new courseEntity();

    courseEntityInstance.id = courseInstance.id as number;
    courseEntityInstance.title = courseInstance.title!;
    // courseEntityInstance.subtitle = courseInstance.subtitle!;
    // courseEntityInstance.course_categories = courseInstance.course_categories;
    // courseEntityInstance.course_sub_category =
    //   courseInstance.course_sub_category;
    // courseEntityInstance.course_topic = courseInstance.course_topic!;
    // courseEntityInstance.course_language = courseInstance.course_language;
    // courseEntityInstance.subtitle_language = courseInstance.subtitle_language;
    // courseEntityInstance.course_level = courseInstance.course_level;
    // courseEntityInstance.durations = courseInstance.durations!;
    // courseEntityInstance.course_thumbnail = courseInstance.course_thumbnail;
    // courseEntityInstance.course_trailer = courseInstance.course_trailer;
    // courseEntityInstance.course_descriptions =
    //   courseInstance.course_descriptions;
    // courseEntityInstance.course_content = courseInstance.course_content;
    // courseEntityInstance.target_audience = courseInstance.target_audience;
    // courseEntityInstance.course_requirements =
    //   courseInstance.course_requirements;
    // courseEntityInstance.course_curriculum = courseInstance.course_curriculum;
    // courseEntityInstance.instructor = courseInstance.instructor!;
    // courseEntityInstance.welcome_message = courseInstance.welcome_message!;
    // courseEntityInstance.congratulation_message =
    //   courseInstance.congratulation_message!;
    // courseEntityInstance.course_price = courseInstance.course_price!;
    // courseEntityInstance.discount = courseInstance.discount!;
    // courseEntityInstance.createdAt = courseInstance.createdAt;
    // courseEntityInstance.updatedAt = courseInstance.updatedAt;
    // courseEntityInstance.deletedAt = courseInstance.deletedAt;
    return courseEntityInstance;
  }
}
