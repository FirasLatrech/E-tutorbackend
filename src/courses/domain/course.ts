import { Category } from 'src/category/domain/category';
import { Chapter } from 'src/chapter/domain/chapter';
import { language } from 'src/language/domain/language';
import { Level } from 'src/level/domain/level';

import { User } from 'src/users/domain/user';

export class Course {
  id: string;
  // title of course
  title: string | null;
  // Subtitle of course

  subtitle: string | null;
  course_topic: string ;
  // categories :
  // course_category relation many to many with the category table

  course_category?: Category | null;
  // course_sub_category relation many to many with the category table

  course_sub_category?: Category | null;
  // // course topic string
  // course_topic: string | null;
  // // course_language  relation with the language table

  course_language: language;
  // // subtitle_language  relation with the language table

  subtitle_language?: language;
  // // course_level  relation with the course_level table

  course_level: Level;
  // // durations  string like 2d 3h 4m
  enrollmentCount?: number;
  durations: string | null;
  // // course_thumbnail  image url

  course_thumbnail?: string;
  // // course_trailer  video url
  rating?: number;

  course_trailer?: string;
  // // course_descriptions  Json

  course_descriptions?: JSON | null;
  // // course_content  Json

  course_content?: JSON | null;
  // // target_audience  Json

  target_audience?: JSON | null;
  // // course_requirements  Json

  course_requirements?: JSON | null;

  // // course_curriculum  Json

  course_curriculum?: JSON | null;

  // // instructor  relation many to many with the user table and have a role instuctor

  instructor: User[] | null;
  // // welcome_message string | null
  welcome_message?: string | null;
  // // congratulation_message string | null

  congratulation_message?: string | null;
  // // course_price string | null liek 20.00$

  course_price?: string | null;
  // // discount : string | null; like 20%
  discount?: string | null;
  // // createdAt : Data

  chapters: Chapter[];

  // createdAt: Date;
  createdAt: Date;

  updatedAt: Date;
  // createdAt : Data

  deletedAt: Date;
}
