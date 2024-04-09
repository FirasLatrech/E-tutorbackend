import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne } from 'typeorm';
import { ChapterEntity } from 'src/chapter/infrastructure/persistence/relational/entities/chapter.entity';
import { FileEntity } from 'src/files/infrastructure/persistence/relational/entities/file.entity';

@Entity()
export class LessonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string | null;

  @ManyToOne(() => ChapterEntity, chapter => chapter.lessons)
  chapter: ChapterEntity;

  @Column({ type: 'integer', default: 0 })
  progress: number;

  @Column({ type: 'boolean', default: false })
  isCompleted: boolean;

  @Column({ type: 'text', nullable: true }) 
  Captions: string | null;

  @Column({ type: 'integer', default: 0 })
  durationInSeconds: number;

  @Column({ type: 'text', nullable: true }) 
  LectureNotes: string | null;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  attachmentFile: FileEntity;

  @ManyToOne(() => FileEntity, {
    eager: true,
  })
  VideoUrl: FileEntity;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt: Date | null;
}
