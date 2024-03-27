import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'course' })
export class courseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  title: string;
  // @Column()
  // categoryId: number;
  // @ManyToOne(() => CategoryEntity, (Category) => Category.id, {
  //   cascade: true,
  // })
  // @JoinColumn({ name: 'course_category' })
  // course_category?: CategoryEntity;

  // @ManyToOne(() => CategoryEntity, (category) => category.id, {
  //   cascade: true,
  // })
  // @JoinColumn({ name: 'course_sub_category' })
  // course_sub_category?: CategoryEntity;

  // @ManyToOne(() => LanguageEntity, (language) => language.id, {
  //   cascade: true,
  // })
  // @JoinColumn({ name: 'course_language' })
  // course_language: LanguageEntity;

  // @ManyToOne(() => LanguageEntity, (language) => language.id, {
  //   cascade: true,
  // })
  // @JoinColumn({ name: 'subtitle_language' })
  // subtitle_language?: LanguageEntity;

  // //   cascade: true,
  // // })
  // // course_language?: LanguageEntity;
  // // @ManyToMany((type) => UserEntity, { cascade: true })
  // // @JoinTable({
  // //   name: 'course_instructor',
  // //   joinColumn: {
  // //     name: 'course_id',
  // //     referencedColumnName: 'id',
  // //   },
  // //   inverseJoinColumn: {
  // //     name: 'instructor_id',
  // //     referencedColumnName: 'id',
  // //   },
  // // })
  // instructor: UserEntity[];
  // @Column({ nullable: true })
  // course_topic: string;

  // @ManyToOne(() => LevelEntity, (language) => language.id, {
  //   cascade: true,
  // })
  // course_level: LanguageEntity;
  // @ManyToOne((type) => LevelEntity)
  // course_level: LevelEntity['id'];
  // @ManyToOne((type) => LevelEntity)
  // course_level: LevelEntity['id'];

  // @Column({ nullable: true })
  // durations: string;

  // @Column({ nullable: true })
  // course_thumbnail?: string;

  // @Column({ nullable: true })
  // course_trailer?: string;

  // @Column('json', { nullable: true })
  // course_descriptions?: any;

  // @Column('json', { nullable: true })
  // course_content?: any;

  // @Column('json', { nullable: true })
  // target_audience?: any;

  // @Column('json', { nullable: true })
  // course_requirements?: any;

  // @Column('json', { nullable: true })
  // course_curriculum?: any;

  // @Column({ nullable: true })
  // welcome_message?: string;

  // @Column({ nullable: true })
  // congratulation_message?: string;

  // @Column({ nullable: true })
  // course_price?: string;

  // @Column({ nullable: true })
  // discount?: string;

  // @Column({ nullable: true, default: 0 })
  // progress?: string;

  // @CreateDateColumn()
  // createdAt: Date;

  // @UpdateDateColumn()
  // updatedAt: Date;

  // @DeleteDateColumn()
  // deletedAt: Date;
}

// @ManyToMany((type) => User, { cascade: true })
// @JoinTable()
// instructor: User[];
