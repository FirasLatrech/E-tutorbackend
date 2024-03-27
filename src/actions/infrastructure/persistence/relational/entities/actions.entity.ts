import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityRelationalHelper } from 'src/utils/relational-entity-helper';
import { Action } from 'src/actions/domain/action';

@Entity({
  name: 'actions',
})
export class ActionEntity extends EntityRelationalHelper implements Action {
  @PrimaryColumn()
  id: number;

  @Column()
  name?: string;
}
