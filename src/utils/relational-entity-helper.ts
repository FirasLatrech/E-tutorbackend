import { instanceToPlain } from 'class-transformer';
import { AfterLoad, BaseEntity } from 'typeorm';

export class EntityRelationalHelper extends BaseEntity {
  __entity?: string;

  @AfterLoad()
  setEntityName() {
    console.log(this);
    this.__entity = this.constructor.name;
  }

  toJSON() {
    return instanceToPlain(this);
  }
}
