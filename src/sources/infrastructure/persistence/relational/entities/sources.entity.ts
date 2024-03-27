import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Sources } from 'src/sources/domain/Sources';

@Entity({
  name: 'Sourcess',
})
export class SourcesEntity extends EntityRelationalHelper implements Sources {
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
