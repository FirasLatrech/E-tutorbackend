// entity-audit-log.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EntityAuditLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  entityName: string;

  @Column()
  action: string;

  @Column()
  entityId: string;

  @Column({ nullable: true })
  oldValue: string;

  @Column({ nullable: true })
  newValue: string;

  @Column()
  timestamp: Date;

  @Column()
  userId: string;
}
