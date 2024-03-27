import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionEnum } from 'src/actions/actions.enum';
import { ActionEntity } from 'src/actions/infrastructure/persistence/relational/entities/actions.entity';

import { Repository } from 'typeorm';

@Injectable()
export class ActionSeedService {
  constructor(
    @InjectRepository(ActionEntity)
    private repository: Repository<ActionEntity>,
  ) {}

  async run() {
    const countAction = await this.repository.count({
      where: {
        id: ActionEnum.create,
      },
    });

    if (!countAction) {
      await this.repository.save(
        this.repository.create({
          id: ActionEnum.create,
          name: 'create',
        }),
      );
    }

    const countAdmin = await this.repository.count({
      where: {
        id: ActionEnum.createMany,
      },
    });

    if (!countAdmin) {
      await this.repository.save(
        this.repository.create({
          id: ActionEnum.createMany,
          name: 'createMany',
        }),
      );
    }

    const countUpdate = await this.repository.count({
      where: {
        id: ActionEnum.update,
      },
    });

    if (!countUpdate) {
      await this.repository.save(
        this.repository.create({
          id: ActionEnum.update,
          name: 'update',
        }),
      );
    }

    const countUpdateMany = await this.repository.count({
      where: {
        id: ActionEnum.updateMany,
      },
    });

    if (!countUpdateMany) {
      await this.repository.save(
        this.repository.create({
          id: ActionEnum.updateMany,
          name: 'update',
        }),
      );
    }
    const countDelete = await this.repository.count({
      where: {
        id: ActionEnum.delete,
      },
    });

    if (!countDelete) {
      await this.repository.save(
        this.repository.create({
          id: ActionEnum.delete,
          name: 'delete',
        }),
      );
    }

    const countDeleteMany = await this.repository.count({
      where: {
        id: ActionEnum.deleteMany,
      },
    });

    if (!countDeleteMany) {
      await this.repository.save(
        this.repository.create({
          id: ActionEnum.deleteMany,
          name: 'deleteMany',
        }),
      );
    }
  }
}
