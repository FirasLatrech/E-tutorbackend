import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { FindOptionsWhere, Repository } from 'typeorm';
import { InstructorEntity } from '../entities/instructor.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Instructor } from '../../../../domain/instructor';
import { InstructorRepository } from '../../instructors.repository';
import { instructorMapper } from '../mappers/instructor.mapper';
import { SortinstructorDto } from 'src/instructor/dto/query-user.dto';

@Injectable()
export class InstructorsRelationalRepository implements InstructorRepository {
  constructor(
    @InjectRepository(InstructorEntity)
    private readonly InstructorsRepository: Repository<InstructorEntity>,
  ) {}

  async create(data: Instructor): Promise<Instructor> {
    const persistenceModel = instructorMapper.toPersistence(data);

    const newEntity = await this.InstructorsRepository.save(
      this.InstructorsRepository.create(persistenceModel),
    );
    return instructorMapper.toDomain(newEntity);
  }

  async findManyWithPagination({
    // filterOptions,
    sortOptions,
    paginationOptions,
  }: {
    // filterOptions?: FilterinstructorDto | null;
    sortOptions?: SortinstructorDto[] | null;
    paginationOptions: IPaginationOptions;
  }): Promise<Instructor[]> {
    const where: FindOptionsWhere<InstructorEntity> = {};

    const entities = await this.InstructorsRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
      where: where,
      order: sortOptions?.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.orderBy]: sort.order,
        }),
        {},
      ),
    });

    return entities.map((Instructor) => instructorMapper.toDomain(Instructor));
  }

  async findOne(
    fields: EntityCondition<Instructor>,
  ): Promise<NullableType<Instructor>> {
    const entity = await this.InstructorsRepository.findOne({
      where: fields as FindOptionsWhere<InstructorEntity>,
    });

    return entity ? instructorMapper.toDomain(entity) : null;
  }

  async update(
    id: Instructor['id'],
    payload: Partial<Instructor>,
  ): Promise<Instructor> {
    const entity = await this.InstructorsRepository.findOne({
      where: { id: String(id) },
    });

    if (!entity) {
      throw new Error('Instructor not found');
    }

    const updatedEntity = await this.InstructorsRepository.save(
      this.InstructorsRepository.create(
        instructorMapper.toPersistence({
          ...instructorMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return instructorMapper.toDomain(updatedEntity);
  }

  async softDelete(id: Instructor['id']): Promise<void> {
    await this.InstructorsRepository.softDelete(id);
  }
}
