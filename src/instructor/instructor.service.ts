import { Injectable } from '@nestjs/common';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { CreateinstructorDto } from './dto/create-instructor.dto';
import { NullableType } from '../utils/types/nullable.type';

import { DeepPartial } from 'src/utils/types/deep-partial.type';

import { InstructorRepository } from './infrastructure/persistence/instructors.repository';
import { Instructor } from './domain/instructor';
import { FilterinstructorDto, SortinstructorDto } from './dto/query-user.dto';

@Injectable()
export class instructorsService {
  constructor(
    private readonly instructorsRepository: InstructorRepository,
    // private readonly filesService: FilesService,
  ) {}

  async create(createProfileDto: CreateinstructorDto) {
    const clonedPayload = {
      ...createProfileDto,
    };

    return this.instructorsRepository.create(clonedPayload);
  }

  findManyWithPagination({
    filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    filterOptions?: FilterinstructorDto | null;
    sortOptions?: SortinstructorDto[] | null;
    paginationOptions: IPaginationOptions;
  }) {
    return this.instructorsRepository.findManyWithPagination({
      filterOptions,
      sortOptions,
      paginationOptions,
    });
  }

  findOne(
    fields: EntityCondition<Instructor>,
  ): Promise<NullableType<Instructor>> {
    return this.instructorsRepository.findOne(fields);
  }

  async update(
    id: Instructor['id'],
    payload: DeepPartial<Instructor>,
  ): Promise<Instructor | null> {
    const clonedPayload = { ...payload };

    return this.instructorsRepository.update(id, clonedPayload);
  }

  async softDelete(id: Instructor['id']): Promise<void> {
    await this.instructorsRepository.softDelete(id);
  }
}
